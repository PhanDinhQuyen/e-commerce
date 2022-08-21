const { Product } = require("../models");

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    // console.log({ query: this.query, queryString: this.queryString });
    const queryObject = { ...this.queryString };
    // console.log(queryObject);

    const excludedFields = ["sort", "page", "limit"];
    excludedFields.forEach(
      (excludedField) => delete queryObject[excludedField]
    );
    // console.log(queryObject);
    let queryStringify = JSON.stringify(queryObject);
    const regex = /\b(gte|gt|lt|lte|regex)\b/g;
    queryStringify = queryStringify.replace(regex, (match) => "$" + match);
    console.log(queryStringify, queryObject);

    this.query.find(JSON.parse(queryStringify));
    return this;
  }

  sorting() {}

  paginating() {}
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
        title: title.toLowerCase(),
        price,
        description,
        content,
        image,
        category,
        checked,
        sold,
      });
      await newProduct.save();

      return res.status(200).json({ msg: "Product created successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getProducts: async (req, res) => {
    try {
      const features = new APIFeatures(Product.find(), req.query).filtering();

      const products = await features.query;
      return res.status(200).json({ products });
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
      if (!image) return res.status(400).json({ msg: "No image available!" });

      await Product.findByIdAndUpdate(
        { _id: product_id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          image,
          category,
          checked,
          sold,
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
