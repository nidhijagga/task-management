const express = require("express");
const router = express.Router();
const {
  getAllTasksForUser,
  createTaskForUser,
  toggleTaskStatus,
} = require("../controllers/taskController");
const authenticate = require("../middleware/auth");

router.get("/get", authenticate, getAllTasksForUser);
router.post("/post", authenticate, createTaskForUser);

// New route for toggling task status
router.put("/toggle/:id", authenticate, toggleTaskStatus);

module.exports = router;
