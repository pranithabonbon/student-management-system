const mongoose = require("mongoose");

const markSchema = new mongoose.Schema(
    {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
        studentName: { type: String },
        subject: { type: String, required: true },
        marks: { type: Number, required: true },
        maxMarks: { type: Number, default: 100 },
        examType: { type: String, default: "Internal" },
        semester: { type: Number },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Mark", markSchema);
