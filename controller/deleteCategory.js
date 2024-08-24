const Category = require("../models/categoryModel");

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    return res.json({ status: "success", message: "category deleted" });
  } catch (error) {}
};
module.exports = deleteCategory;
