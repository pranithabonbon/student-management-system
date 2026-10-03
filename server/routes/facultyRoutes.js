const express = require("express");
const router = express.Router();
const { addFaculty, getFaculty, getFacultyById, updateFaculty, deleteFaculty } = require("../controllers/facultyController");

router.post("/", addFaculty);
router.get("/", getFaculty);
router.get("/:id", getFacultyById);
router.put("/:id", updateFaculty);
router.delete("/:id", deleteFaculty);

module.exports = router;
