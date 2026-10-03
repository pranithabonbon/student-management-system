const express = require("express");
const router = express.Router();
const { markAttendance, markBulkAttendance, getAttendance } = require("../controllers/attendanceController");

router.post("/", markAttendance);
router.post("/bulk", markBulkAttendance);
router.get("/", getAttendance);

module.exports = router;
