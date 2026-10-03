const StudyMaterial = require("../models/StudyMaterial");
const Announcement = require("../models/Announcement");
const Assignment = require("../models/Assignment");
const Notification = require("../models/Notification");
const Timetable = require("../models/Timetable");
const Fee = require("../models/Fee");

const addStudyMaterial = async (req, res) => {
    try {
        const material = await StudyMaterial.create(req.body);
        res.status(201).json({ success: true, data: material });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getStudyMaterials = async (req, res) => {
    try {
        const filter = req.query.subject ? { subject: req.query.subject } : {};
        const materials = await StudyMaterial.find(filter).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: materials });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const addAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.create(req.body);
        res.status(201).json({ success: true, data: announcement });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: announcements });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const addAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.create(req.body);
        res.status(201).json({ success: true, data: assignment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find().sort({ dueDate: 1 });
        res.status(200).json({ success: true, data: assignments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const addNotification = async (req, res) => {
    try {
        const notification = await Notification.create(req.body);
        res.status(201).json({ success: true, data: notification });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getNotifications = async (req, res) => {
    try {
        const filter = {};
        if (req.query.role) filter.$or = [{ targetRole: "all" }, { targetRole: req.query.role }];
        if (req.query.studentId) filter.$or = [{ studentId: req.query.studentId }, { targetRole: "all" }, { targetRole: "student" }];
        const notifications = await Notification.find(filter).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const addTimetable = async (req, res) => {
    try {
        const entry = await Timetable.create(req.body);
        res.status(201).json({ success: true, data: entry });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getTimetable = async (req, res) => {
    try {
        const filter = {};
        if (req.query.department) filter.department = req.query.department;
        if (req.query.year) filter.year = Number(req.query.year);
        const timetable = await Timetable.find(filter);
        res.status(200).json({ success: true, data: timetable });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteTimetable = async (req, res) => {
    try {
        await Timetable.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Timetable entry deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const addFee = async (req, res) => {
    try {
        const fee = await Fee.create(req.body);
        const Student = require("../models/Student");
        await Student.findByIdAndUpdate(req.body.studentId, {
            feeStatus: req.body.status || "pending",
            feeAmount: req.body.amount,
            feePaid: req.body.paidAmount || 0,
        });
        res.status(201).json({ success: true, data: fee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getFees = async (req, res) => {
    try {
        const fees = await Fee.find().populate("studentId", "name email rollNumber");
        res.status(200).json({ success: true, data: fees });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateFee = async (req, res) => {
    try {
        const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (fee) {
            const Student = require("../models/Student");
            await Student.findByIdAndUpdate(fee.studentId, {
                feeStatus: fee.status,
                feePaid: fee.paidAmount,
            });
        }
        res.status(200).json({ success: true, data: fee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    addStudyMaterial, getStudyMaterials,
    addAnnouncement, getAnnouncements,
    addAssignment, getAssignments,
    addNotification, getNotifications,
    addTimetable, getTimetable, deleteTimetable,
    addFee, getFees, updateFee,
};
