const Blog = require("../models/blogModel");

const createBlog = async (req, res) => {
  const { title, description, postedBy, category, tags } = req.body;

  let tagArray = tags.split(",");

  if (tagArray.length > 5) {
    return res.send("Maximum 5tags are allowed");
  } else {
    try {
      let blog = new Blog({
        title: title,
        description: description,
        image: req.file.path,
        postedBy: postedBy,
        category: category,
        tags: tagArray,
      });

      await blog.save();
      return res
        .status(201)
        .json({ status: "success", message: "blog posted", data: blog });
    } catch (error) {
      console.log(error.message);
    }
  }
};

module.exports = createBlog;
