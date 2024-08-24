const Blog = require("../models/blogModel");
const fs = require("fs");

const deleteBlogController = async (req, res) => {
  const { id } = req.body;
  const blog = await Blog.findById({ _id: id });

  fs.unlinkSync(blog.image);

  await Blog.findByIdAndDelete(id);
  res.status(200).json({ message: "blog deleted" });
};

module.exports = deleteBlogController;
