const { Product } = require("../models");

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObject = { ...this.queryString };
    const excludedFields = ["sort", "page", "limit"];
    excludedFields.forEach(
      (excludedField) => delete queryObject[excludedField]
    );
    const regex = /\b(gte|gt|lt|lte|regex)\b/g;
    //gte = greater than or equal
    //lte = lesser than or equal
    //lt = lesser than
    //gt = greater than
    const queryStringify = JSON.stringify(queryObject).replace(
      regex,
      (match) => "$" + match
    );
    this.query.find(JSON.parse(queryStringify));
    return this;
  }

  sorting() {
    console.log("sorting", this.queryString.sort);
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("createdAt");
    }
    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    // 9 products for a page
    const limit = this.queryString.limit * 1 || 9;

    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const productController = {
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        image,
        category,
        checked,
        sold,
      } = req.body;
      if (!image) return res.status(400).json({ msg: "No image available!" });

      const product = await Product.findOne({ product_id });
      if (product)
        return res.status(400).json({ msg: "Product already exists!" });

      const newProduct = new Product({
        product_id,
        title,
        price,
        description,
        content,
        image,
        category,
        checked,
        sold,
        lower_title: title.toLowerCase(),
      });
      await newProduct.save();

      return res.status(200).json({ msg: "Product created successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getProducts: async (req, res) => {
    console.log("lol", req.query);
    try {
      const features = new APIFeatures(
        Product.find().select(`-lower_title`),
        req.query
      )
        .sorting()
        .paginating()
        .filtering();
      const products = await features.query;
      return res.status(200).json({
        products,
      });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
  getProductWithId: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(400).json({ msg: "Product not found." });

      return res.status(200).json({ product });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        image,
        category,
        checked,
        sold,
      } = req.body;
      const lower_title = title.toLowerCase();

      if (!image) return res.status(400).json({ msg: "No image available!" });

      await Product.findByIdAndUpdate(
        { _id: req.params.id },
        {
          product_id,
          title,
          price,
          description,
          content,
          image,
          category,
          checked,
          sold,
          lower_title,
        }
      );
      return res.status(200).json({ msg: "Product updated successfully" });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      return res.status(200).json({ msg: "Product deleted successfully" });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
};

module.exports = productController;
