const Category = require("../models/categoryModel");

const showAllCategory = async (req, res) => {
  let categories = await Category.find();
  return res.json({
    status: "scuccess",
    message: "all category",
    data: categories,
  });
};

module.exports = showAllCategory;
