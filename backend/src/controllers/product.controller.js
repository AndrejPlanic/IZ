const Product = require("../models/product.model");

exports.createProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      // This can come as array of filenames
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { category, subcategory } = req.query;

    // Build query object
    const query = {};
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;

    const products = await Product.find(query)
      .populate("category")
      .populate("subcategory");

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("subcategory");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTopProductsByQuantity = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ quantity: -1 })
      .limit(8)
      .populate("category")
      .populate("subcategory");

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
