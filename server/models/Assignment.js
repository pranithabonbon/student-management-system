const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        subject: { type: String, required: true },
        description: { type: String },
        dueDate: { type: Date, required: true },
        department: { type: String },
        year: { type: Number },
        facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);
