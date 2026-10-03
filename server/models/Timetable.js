const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema(
    {
        day: { type: String, required: true },
        time: { type: String, required: true },
        subject: { type: String, required: true },
        department: { type: String, required: true },
        year: { type: Number, required: true },
        room: { type: String },
        facultyName: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Timetable", timetableSchema);
