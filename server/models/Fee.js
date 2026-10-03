const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
    {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
        studentName: { type: String },
        amount: { type: Number, required: true },
        paidAmount: { type: Number, default: 0 },
        status: { type: String, enum: ["paid", "pending", "overdue"], default: "pending" },
        dueDate: { type: Date },
        semester: { type: Number },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Fee", feeSchema);
