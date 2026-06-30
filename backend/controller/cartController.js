const User = require("../model/User");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const user = await User.findById(req.user._id);

    const existing = user.cart.find(i => i.product.toString() === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.status(200).json({ success: true, message: "Added to cart" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product");
    res.status(200).json({ success: true, items: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter(i => i.product.toString() !== productId);
    await user.save();
    res.status(200).json({ success: true, message: "Item removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user._id);

    const item = user.cart.find(i => i.product.toString() === productId);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    if (quantity <= 0) {
      user.cart = user.cart.filter(i => i.product.toString() !== productId);
    } else {
      item.quantity = quantity;
    }

    await user.save();
    res.status(200).json({ success: true, message: "Cart updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { addToCart, getCart, removeFromCart, updateQuantity };