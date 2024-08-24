const emailValidation = require("../validation/emailValidation");

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;

  let numeric = /(?=.*[0-9])/.test(password);
  let uppercase = /(?=.*[A-Z])/.test(password);
  let lowercase = /(?=.*[a-z])/.test(password);
  let character = /(?=.*\W)/.test(password);
  let length = /.{8,16}/.test(password);

  if (!emailValidation(email)) {
    return res.status(403).json({ message: "Enter a valid email address" });
  } else if (
    password == "" ||
    !numeric ||
    !uppercase ||
    !lowercase ||
    !character ||
    !length ||
    password == undefined
  ) {
    if (password === "" || password === undefined) {
      return res.status(403).json({ message: "Password is required" });
    } else if (!numeric) {
      return res.status(403).json({ message: "Enter a digit" });
    } else if (!uppercase) {
      return res.status(403).json({ message: "Enter an uppercase letter" });
    } else if (!lowercase) {
      return res.status(403).json({ message: "Enter a lowercase letter" });
    } else if (!character) {
      return res.status(403).json({ message: "Enter a special character" });
    } else if (!length) {
      return res
        .status(403)
        .json({ message: "Password must be in between 8-16 characters" });
    } else {
      return res.status(200).json({ message: "password validated" });
    }
  } else {
    next();
  }
};

module.exports = loginValidation;
