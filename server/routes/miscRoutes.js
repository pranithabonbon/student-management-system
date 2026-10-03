const express = require("express");
const router = express.Router();
const {
    addStudyMaterial, getStudyMaterials,
    addAnnouncement, getAnnouncements,
    addAssignment, getAssignments,
    addNotification, getNotifications,
    addTimetable, getTimetable, deleteTimetable,
    addFee, getFees, updateFee,
} = require("../controllers/miscController");

router.post("/materials", addStudyMaterial);
router.get("/materials", getStudyMaterials);
router.post("/announcements", addAnnouncement);
router.get("/announcements", getAnnouncements);
router.post("/assignments", addAssignment);
router.get("/assignments", getAssignments);
router.post("/notifications", addNotification);
router.get("/notifications", getNotifications);
router.post("/timetable", addTimetable);
router.get("/timetable", getTimetable);
router.delete("/timetable/:id", deleteTimetable);
router.post("/fees", addFee);
router.get("/fees", getFees);
router.put("/fees/:id", updateFee);

module.exports = router;
