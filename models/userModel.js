const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  designation: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
