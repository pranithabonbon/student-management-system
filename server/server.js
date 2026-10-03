const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const seedDatabase = require("./seed/seedData");

const app = express();

connectDB().then(() => seedDatabase());

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Student Management System API is running");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/faculty", require("./routes/facultyRoutes"));
app.use("/api/departments", require("./routes/departmentRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/qr", require("./routes/qrRoutes"));
app.use("/api/marks", require("./routes/markRoutes"));
app.use("/api", require("./routes/miscRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
