const express = require("express");
const router = express.Router();
const {
  getAllTasksForUser,
  createTaskForUser,
} = require("../controllers/taskController");
const authenticate = require("../middleware/auth");

router.get("/get", authenticate, getAllTasksForUser);

router.post("/post", authenticate, createTaskForUser);

module.exports = router;
