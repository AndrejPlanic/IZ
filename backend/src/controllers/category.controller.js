const Category = require("../models/category.model");

// Create a new category (or subcategory)
exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all categories with optional filtering for parent = null (root categories)
exports.getCategories = async (req, res) => {
  try {
    const filter = {};
    if (req.query.rootOnly === "true") {
      filter.parent = null;
    }
    const categories = await Category.find(filter);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get category by ID (optionally populate subcategories)
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("parent");
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upda te a category by ID
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get only main/root categories (those without a parent)
exports.getMainCategories = async (req, res) => {
  try {
    const mainCategories = await Category.find({ parent: null });
    res.json(mainCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get only subcategories (categories that have a parent)
exports.getSubCategories = async (req, res) => {
  try {
    const subCategories = await Category.find({ parent: { $ne: null } });
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get subcategories of a specific category by parent ID
exports.getCategoriesByParentId = async (req, res) => {
  try {
    const parentId = req.params.parentId;
    const subcategories = await Category.find({ parent: parentId });
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /categories-with-subcategories
exports.getCategoriesWithSubcategories = async (req, res) => {
  try {
    // Find all top-level categories (parent: null)
    const categories = await Category.find({ parent: null });

    // For each top-level category, fetch its subcategories
    const results = await Promise.all(
      categories.map(async (category) => {
        const subs = await Category.find({ parent: category._id }).select(
          "name _id"
        );
        return {
          category: {
            id: category._id,
            name: category.name,
          },
          subcategories: subs.map((sub) => ({
            id: sub._id,
            name: sub.name,
          })),
        };
      })
    );

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
