const express = require("express");
const router = express.Router();
const { generateQR, scanQR, getActiveSessions } = require("../controllers/qrController");

router.post("/generate", generateQR);
router.post("/scan", scanQR);
router.get("/sessions", getActiveSessions);

module.exports = router;
