const mongoose = require("mongoose");

const studyMaterialSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        subject: { type: String, required: true },
        description: { type: String },
        fileUrl: { type: String },
        facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
        facultyName: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("StudyMaterial", studyMaterialSchema);
