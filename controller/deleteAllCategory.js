const Category = require("../models/categoryModel");
const deleteAllCategory = async (req, res) => {
  const { ids } = req.body;
  await Category.deleteMany({ _id: { $in: ids } });
  res.json({ status: "success", message: "categories deleted" });
};

module.exports = deleteAllCategory;
