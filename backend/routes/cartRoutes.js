const router = require("express").Router();
const { addToCart, getCart, removeFromCart, updateQuantity } = require("../controller/cartController");
const { isAuthenticated } = require("../middleware/authenticated");

router.post("/add", isAuthenticated, addToCart);
router.get("/", isAuthenticated, getCart);
router.delete("/remove/:productId", isAuthenticated, removeFromCart);
router.put("/update", isAuthenticated, updateQuantity);

module.exports = router;