const express = require("express");
const router = express.Router();
const {
  getAllTasksForUser,
  createTaskForUser,
  toggleTaskStatus,
  editTaskForUser,
} = require("../controllers/taskController");
const authenticate = require("../middleware/auth");

router.get("/get", authenticate, getAllTasksForUser);
router.post("/post", authenticate, createTaskForUser);

router.put("/toggle/:id", authenticate, toggleTaskStatus);
router.put("/edit/:id", authenticate, editTaskForUser);

module.exports = router;
