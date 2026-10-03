const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        code: { type: String, required: true, unique: true },
        department: { type: String, required: true },
        semester: { type: Number, required: true },
        credits: { type: Number, default: 3 },
        facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
        facultyName: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
