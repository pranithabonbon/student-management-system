const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        department: { type: String },
        facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
        facultyName: { type: String },
        priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
