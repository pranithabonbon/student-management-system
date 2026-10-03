const Attendance = require("../models/Attendance");
const Student = require("../models/Student");

const markAttendance = async (req, res) => {
    try {
        const { studentId, subject, status, method } = req.body;
        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ success: false, message: "Student not found" });

        const attendance = await Attendance.create({
            studentId,
            studentName: student.name,
            subject,
            status: status || "present",
            method: method || "manual",
        });

        await updateAttendancePercentage(studentId);
        res.status(201).json({ success: true, data: attendance });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const markBulkAttendance = async (req, res) => {
    try {
        const { students, subject, status } = req.body;
        const records = [];
        for (const studentId of students) {
            const student = await Student.findById(studentId);
            if (student) {
                const att = await Attendance.create({
                    studentId,
                    studentName: student.name,
                    subject,
                    status: status || "present",
                    method: "manual",
                });
                records.push(att);
                await updateAttendancePercentage(studentId);
            }
        }
        res.status(201).json({ success: true, count: records.length, data: records });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAttendance = async (req, res) => {
    try {
        const filter = {};
        if (req.query.studentId) filter.studentId = req.query.studentId;
        if (req.query.subject) filter.subject = req.query.subject;
        const attendance = await Attendance.find(filter).sort({ date: -1 });
        res.status(200).json({ success: true, data: attendance });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

async function updateAttendancePercentage(studentId) {
    const records = await Attendance.find({ studentId });
    if (records.length === 0) return;
    const present = records.filter((r) => r.status === "present").length;
    const percentage = Math.round((present / records.length) * 100);
    await Student.findByIdAndUpdate(studentId, { attendancePercentage: percentage });
}

module.exports = { markAttendance, markBulkAttendance, getAttendance };
