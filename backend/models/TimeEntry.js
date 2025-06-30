const mongoose = require("mongoose");

const TimeEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  taskLabel: String,
  start: Date,
  end: Date
});

module.exports = mongoose.model("TimeEntry", TimeEntrySchema);
