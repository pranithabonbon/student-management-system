const Mark = require("../models/Mark");
const Student = require("../models/Student");

const uploadMarks = async (req, res) => {
    try {
        const { studentId, subject, marks, maxMarks, examType, semester } = req.body;
        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ success: false, message: "Student not found" });

        const mark = await Mark.create({
            studentId,
            studentName: student.name,
            subject,
            marks,
            maxMarks: maxMarks || 100,
            examType: examType || "Internal",
            semester,
        });
        res.status(201).json({ success: true, data: mark });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getMarks = async (req, res) => {
    try {
        const filter = {};
        if (req.query.studentId) filter.studentId = req.query.studentId;
        if (req.query.subject) filter.subject = req.query.subject;
        const marks = await Mark.find(filter).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: marks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { uploadMarks, getMarks };
