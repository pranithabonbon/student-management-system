const express = require("express");
const router = express.Router();
const { addDepartment, getDepartments, updateDepartment, deleteDepartment } = require("../controllers/departmentController");

router.post("/", addDepartment);
router.get("/", getDepartments);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);

module.exports = router;
