const bcrypt = require("bcrypt");
const Registration = require("../models/registerModel");
const nodemailer = require("nodemailer");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // find user by email
    let existingUser = await Registration.findOne({ email: email });

    // hashing password
    const hashPassword = await bcrypt.hash(password, 10);

    if (existingUser != null) {
      res.status(400).json({
        status: "fail",
        message: "User already exist..!",
      });
    } else {
      let user = new Registration({
        username: username,
        email: email,
        password: hashPassword,
      });
      await user.save();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "monmoykms.16@gmail.com",
          pass: "ozis drid merf ulhl",
        },
      });
      const info = await transporter.sendMail({
        from: "Blog App", // sender address
        to: user.email, // list of receivers
        subject: "Email Verification Link", // Subject line
        html: `<!doctypehtml><meta charset=UTF-8><title>Email Verification</title><body style=font-family:Arial,sans-serif;margin:0;padding:0;background-color:#f7f7f7><table role=presentation style=width:100%;border-collapse:collapse;background-color:#f7f7f7;margin:0;padding:20px><tr><td align=center><table role=presentation style=width:600px;border-collapse:collapse;background-color:#fff;padding:20px;border-radius:8px><tr><td align=center style="padding:20px 0"><h1 style=color:#333;font-size:24px;margin:0>Verify Your Email Address</h1><tr><td style=padding:20px><p style=color:#333;font-size:16px;line-height:1.5;margin:0;>Hi, <span style=font-weight:bold>${user.username}</span></span>,<p style=color:#333;font-size:16px;line-height:1.5;margin:0>Thank you for registering with us! Please click the button below to verify your email address.<p style="text-align:center;margin:20px 0"><a href="https://blog-api-7py7.onrender.com/${user.email}"style="background-color:#007bff;color:#fff;text-decoration:none;padding:10px 20px;border-radius:4px;display:inline-block;font-size:16px">Verify Email</a><p style=color:#333;font-size:16px;line-height:1.5;margin:0>If you did not create an account, no further action is required.<p style=color:#333;font-size:16px;line-height:1.5;margin:0>Regards,<br>The Blog App Team</table></table>`, // html body
      });

      console.log("Message sent: %s", info.messageId);

      return res
        .status(201)
        .json({ message: "Registration Successful", data: { user } });
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = registerUser;
