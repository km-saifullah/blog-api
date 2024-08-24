const Registration = require("../models/registerModel");

const emailVerification = async (req, res) => {
  let email = req.params.email;
  let existingUser = await Registration.findOneAndUpdate(
    { email: email },
    { emailVerify: true },
    { new: true }
  );

  if (existingUser == null) {
    return res.status(404).json({ status: "fail", message: "Email not found" });
  } else {
    return res.status(200).send("<h2>Email Verified</h2>");
  }
};

module.exports = emailVerification;
