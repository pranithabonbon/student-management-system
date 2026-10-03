const express = require("express");
const router = express.Router();
const { getAnalytics, getFacultyAnalytics } = require("../controllers/analyticsController");

router.get("/", getAnalytics);
router.get("/faculty", getFacultyAnalytics);

module.exports = router;
