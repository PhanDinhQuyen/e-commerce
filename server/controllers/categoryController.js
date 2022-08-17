const Category = require("../models/categoryModel");

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();

      res.json({ categories });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      // Only admin can create, delete and update categories

      res.json({ msg: "Check admin resource" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryController;
