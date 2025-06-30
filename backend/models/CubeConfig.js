const mongoose = require("mongoose");

const CubeConfigSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sides: [
    {
      side: Number, // 1–6
      label: String // Projektname
    }
  ]
});

module.exports = mongoose.model("CubeConfig", CubeConfigSchema);
