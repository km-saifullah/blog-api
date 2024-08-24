const Category = require("../models/categoryModel");
const editCategory = async (req, res) => {
  const { id, name, description } = req.body;

  const categoryExist = await Category.findOne({ _id: id });
  console.log(categoryExist);
  if (categoryExist == null) {
    return res.json({ status: "fail", message: "category not found" });
  }

  let editCategory = {
    name: name || categoryExist.name,
    description: description || categoryExist.description,
  };

  let updateCategory = await Category.findByIdAndUpdate(
    { _id: id },
    editCategory,
    { new: true }
  );
  return res.json({
    status: "succeess",
    message: "category edited",
    data: updateCategory,
  });
};
module.exports = editCategory;
