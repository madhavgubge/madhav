const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  player_id: {
    type: Number,
    required: true,
  },
  player_name: {
    type: String,
    required: true,
  },
  jersey_number: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", userSchema);
