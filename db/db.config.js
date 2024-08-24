const { default: mongoose } = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected....!");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { connectDb };
