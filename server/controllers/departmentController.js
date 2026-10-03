const Department = require("../models/Department");

const addDepartment = async (req, res) => {
    try {
        const dept = await Department.create(req.body);
        res.status(201).json({ success: true, data: dept });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json({ success: true, data: departments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateDepartment = async (req, res) => {
    try {
        const dept = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!dept) return res.status(404).json({ success: false, message: "Department not found" });
        res.status(200).json({ success: true, data: dept });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteDepartment = async (req, res) => {
    try {
        const dept = await Department.findByIdAndDelete(req.params.id);
        if (!dept) return res.status(404).json({ success: false, message: "Department not found" });
        res.status(200).json({ success: true, message: "Department deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { addDepartment, getDepartments, updateDepartment, deleteDepartment };
