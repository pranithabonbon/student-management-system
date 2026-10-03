const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
    {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
        studentName: { type: String },
        subject: { type: String, required: true },
        date: { type: Date, default: Date.now },
        status: { type: String, enum: ["present", "absent"], default: "present" },
        method: { type: String, enum: ["manual", "qr"], default: "manual" },
        qrSessionId: { type: mongoose.Schema.Types.ObjectId, ref: "QRSession" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
