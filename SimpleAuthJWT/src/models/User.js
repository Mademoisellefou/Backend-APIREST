const { Schema, model } = require("mongoose");
const UserSchema = new Schema({
  email: String,
  password: String,
  time: { type: Date, default: Date.now },
});
module.exports = model("User", UserSchema);
