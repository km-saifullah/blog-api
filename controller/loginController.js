const Registration = require("../models/registerModel");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await Registration.findOne({ email: email });

  if (existingUser === null) {
    return res.json({
      message: "The email address has not been registered..!",
    });
  } else {
    // compare hash password
    let match = await bcrypt.compare(password, existingUser.password);
    if (match) {
      if (existingUser.emailVerify) {
        return res
          .status(200)
          .json({ message: "Login Successful", data: existingUser });
      } else {
        return res
          .status(200)
          .json({ message: "Please verify your email address" });
      }
    } else {
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid Email or Password" });
    }
  }
};

module.exports = loginUser;
