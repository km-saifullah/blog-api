const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailVerify: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Registration", registerSchema);
