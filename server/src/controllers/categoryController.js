const { Category } = require("../models");

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
      const { name } = req.body;

      const category = await Category.findOne({ name: name });
      if (category) {
        return res.status(400).json({ msg: "Category already exists" });
      }
      const newCategory = new Category({ name });
      await newCategory.save();
      return res.status(200).json({ msg: "Category created successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const id = req.params.id;
      const category = await Category.findById({ _id: id });
      if (!category) {
        return res.status(400).json({ msg: "Category not found" });
      }
      await Category.findByIdAndDelete({ _id: id });
      return res.status(200).json({ msg: "Category deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findOne({ name });

      if (category) {
        return res.status(400).json({ msg: "Category already exists" });
      }

      await Category.findOneAndUpdate({ _id: req.params.id }, { name });
      return res.status(200).json({ msg: "Category updated successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryController;
