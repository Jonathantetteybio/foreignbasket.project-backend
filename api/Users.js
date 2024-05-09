const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("user", UserSchema);
