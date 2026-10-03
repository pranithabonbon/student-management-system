const Student = require("../models/Student");

const addStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json({ success: true, message: "Student added successfully", data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ success: true, count: students.length, data: students });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ success: false, message: "Student not found" });
        res.status(200).json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!student) return res.status(404).json({ success: false, message: "Student not found" });
        res.status(200).json({ success: true, message: "Student updated successfully", data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ success: false, message: "Student not found" });
        res.status(200).json({ success: true, message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getStudentDashboard = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ success: false, message: "Student not found" });

        const Attendance = require("../models/Attendance");
        const Assignment = require("../models/Assignment");
        const Notification = require("../models/Notification");
        const Mark = require("../models/Mark");

        const attendance = await Attendance.find({ studentId: req.params.id }).sort({ date: -1 }).limit(30);
        const assignments = await Assignment.find({
            $or: [{ department: student.department }, { department: { $exists: false } }],
            dueDate: { $gte: new Date() },
        }).sort({ dueDate: 1 }).limit(10);

        const notifications = await Notification.find({
            $or: [
                { targetRole: "all" },
                { targetRole: "student" },
                { studentId: req.params.id },
            ],
        }).sort({ createdAt: -1 }).limit(10);

        const marks = await Mark.find({ studentId: req.params.id });

        res.status(200).json({
            success: true,
            data: { student, attendance, assignments, notifications, marks },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { addStudent, getStudents, getStudentById, updateStudent, deleteStudent, getStudentDashboard };
