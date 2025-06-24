const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/top-quantity", productController.getTopProductsByQuantity);
router.get("/:id", productController.getProductById);

module.exports = router;
