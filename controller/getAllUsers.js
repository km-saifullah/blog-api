const Registration = require("../models/registerModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await Registration.find();
    return res.status(200).json({
      status: "success",
      results: users.length,
      message: "all users",
      data: users,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getAllUsers;
