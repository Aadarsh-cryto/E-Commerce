const router = require("express").Router();
const { addProduct, getProducts, deleteProduct, getProductById } = require('../controller/ProductController')
const { isAuthenticated } = require("../middleware/authenticated");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", isAuthenticated, addProduct);
router.delete("/:id", isAuthenticated, deleteProduct);

module.exports = router;