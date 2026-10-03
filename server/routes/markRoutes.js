const express = require("express");
const router = express.Router();
const { uploadMarks, getMarks } = require("../controllers/markController");

router.post("/", uploadMarks);
router.get("/", getMarks);

module.exports = router;
