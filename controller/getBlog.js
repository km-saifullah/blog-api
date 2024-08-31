const Blog = require("../models/blogModel");

const getBlog = async (req, res) => {
  const id = req.params.id;
  let blogs = await Blog.findById({ _id: id })
    .populate({
      path: "postedBy",
      select: "-password",
    })
    .populate("category");
  res
    .status(200)
    .json({ status: "success", result: blogs.length, data: blogs });
};

module.exports = getBlog;
