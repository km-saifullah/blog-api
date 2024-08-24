const blogPostValidation = (req, res, next) => {
  const { title, description, image, postedBy } = req.body;

  //  blogpost validation validation
  if (title === "" || title === undefined) {
    return res.status(400).json({ message: "Title is required" });
  } else if (description === "" || description === undefined) {
    return res.status(400).json({ message: "Enter a Description" });
  } else if (postedBy === "" || postedBy === undefined) {
    return res.status(400).json({ message: "Enter a user id" });
  } else {
    next();
  }
};

module.exports = blogPostValidation;
