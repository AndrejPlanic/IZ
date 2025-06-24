const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.get("/main", categoryController.getMainCategories);
router.get("/cat-sub", categoryController.getCategoriesWithSubcategories);
router.get("/sub", categoryController.getSubCategories);
router.get("/parent/:parentId", categoryController.getCategoriesByParentId);
router.get("/:id", categoryController.getCategoryById);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
//getCategoriesWithSubcategories
