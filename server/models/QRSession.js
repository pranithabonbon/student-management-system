const mongoose = require("mongoose");

const qrSessionSchema = new mongoose.Schema(
    {
        token: { type: String, required: true, unique: true },
        subject: { type: String, required: true },
        facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true },
        facultyName: { type: String },
        expiresAt: { type: Date, required: true },
        isActive: { type: Boolean, default: true },
        scannedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("QRSession", qrSessionSchema);
