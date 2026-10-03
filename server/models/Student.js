const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        rollNumber: { type: String, required: true, unique: true },
        department: { type: String, required: true },
        year: { type: Number, required: true },
        semester: { type: Number, default: 1 },
        gpa: { type: Number, default: 0 },
        gpaHistory: [{ semester: Number, gpa: Number }],
        subjects: [{ type: String }],
        feeStatus: {
            type: String,
            enum: ["paid", "pending", "overdue"],
            default: "pending",
        },
        feeAmount: { type: Number, default: 50000 },
        feePaid: { type: Number, default: 0 },
        attendancePercentage: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
