const Blog = require("../models/blogModel");

const getAllBlogs = async (req, res) => {
  let blogs = await Blog.find({})
    .populate({
      path: "postedBy",
      select: "-password",
    })
    .populate("category");
  res
    .status(200)
    .json({ status: "success", result: blogs.length, data: blogs });
};
module.exports = getAllBlogs;
