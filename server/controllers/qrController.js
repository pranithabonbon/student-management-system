const crypto = require("crypto");
const QRSession = require("../models/QRSession");
const Attendance = require("../models/Attendance");
const Student = require("../models/Student");

const generateQR = async (req, res) => {
    try {
        const { subject, facultyId, facultyName } = req.body;
        const token = crypto.randomBytes(16).toString("hex");
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        const session = await QRSession.create({
            token,
            subject,
            facultyId,
            facultyName,
            expiresAt,
        });

        res.status(201).json({
            success: true,
            data: {
                sessionId: session._id,
                token,
                subject,
                expiresAt,
                qrData: JSON.stringify({ token, subject }),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const scanQR = async (req, res) => {
    try {
        const { token, studentId } = req.body;

        const session = await QRSession.findOne({ token, isActive: true });
        if (!session) return res.status(404).json({ success: false, message: "Invalid or expired QR session" });
        if (new Date() > session.expiresAt) {
            session.isActive = false;
            await session.save();
            return res.status(400).json({ success: false, message: "QR session has expired" });
        }

        if (session.scannedBy.includes(studentId)) {
            return res.status(400).json({ success: false, message: "Attendance already marked for this session" });
        }

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ success: false, message: "Student not found" });

        const attendance = await Attendance.create({
            studentId,
            studentName: student.name,
            subject: session.subject,
            status: "present",
            method: "qr",
            qrSessionId: session._id,
        });

        session.scannedBy.push(studentId);
        await session.save();

        const records = await Attendance.find({ studentId });
        const present = records.filter((r) => r.status === "present").length;
        const percentage = Math.round((present / records.length) * 100);
        await Student.findByIdAndUpdate(studentId, { attendancePercentage: percentage });

        res.status(201).json({
            success: true,
            message: "Attendance marked successfully via QR",
            data: attendance,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getActiveSessions = async (req, res) => {
    try {
        const sessions = await QRSession.find({
            isActive: true,
            expiresAt: { $gt: new Date() },
        }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: sessions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { generateQR, scanQR, getActiveSessions };
