const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        department: { type: String, required: true },
        designation: { type: String, default: "Assistant Professor" },
        subjects: [{ type: String }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Faculty", facultySchema);
