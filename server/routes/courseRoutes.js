const express = require("express");
const router = express.Router();
const { addCourse, getCourses, updateCourse, deleteCourse } = require("../controllers/courseController");

router.post("/", addCourse);
router.get("/", getCourses);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
