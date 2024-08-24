const Blog = require("../models/blogModel");

const editBlogController = async (req, res) => {
  const { id, title, description, image } = req.body;
  let blogImg = req.file.path ? req.file.path : image;

  const blog = await Blog.findByIdAndUpdate(
    { _id: id },
    { title: title, description: description, image: blogImg }
  );

  res
    .status(200)
    .json({ status: "success", message: "blog edited", data: blog });
};

module.exports = editBlogController;
