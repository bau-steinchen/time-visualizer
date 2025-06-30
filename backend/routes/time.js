const express = require("express");
const TimeEntry = require("../models/TimeEntry");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = express.Router();

// GET /dashboard
router.get("/", auth, async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  const entries = await TimeEntry.find({ userId }).sort({ start: -1 });

  res.render("dashboard", { user, entries });
});

// POST /dashboard/new
router.post("/new", auth, async (req, res) => {
  const { taskLabel, start, end } = req.body;
  await TimeEntry.create({
    userId: req.user.id,
    taskLabel,
    start: new Date(start),
    end: new Date(end)
  });
  res.redirect("/dashboard");
});

module.exports = router;
