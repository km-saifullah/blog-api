const Category = require("../models/categoryModel");

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const categoryExist = await Category.findOne({ name: name.toLowerCase() });

    if (categoryExist != null) {
      return res.json({ status: "fail", message: "category already exist" });
    }

    let category = new Category({
      name: name.toLowerCase(),
      description: description,
    });
    await category.save();
    return res.json({
      status: "success",
      message: "category created",
      data: category,
    });
  } catch (error) {}
};
module.exports = createCategory;
