const mongoose = require("mongoose");
const userScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 255,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    min: 255,
    min: 6,
  },
  password: {
    type: String,
    max: 1024,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("User", userScheme);
