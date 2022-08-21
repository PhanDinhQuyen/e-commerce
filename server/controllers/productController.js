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
    const regex = /\b(gte|gt|lt|lte|regex)\b/g;
    //gte = greater than or equal
    //lte = lesser than or equal
    //lt = lesser than
    //gt = greater than
    const queryStringify = JSON.stringify(queryObject).replace(
      regex,
      (match) => "$" + match
    );
    console.log({ queryStringify, queryObject });
    console.log(JSON.parse(queryStringify));

    this.query.find(JSON.parse(queryStringify));
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createAt");
    }
    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 2;
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
      const features = new APIFeatures(Product.find(), req.query)
        .filtering()
        .sorting()
        .paginating();

      const products = await features.query;
      return res.status(200).json({
        products,
        totalProducts: products.length,
      });
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
