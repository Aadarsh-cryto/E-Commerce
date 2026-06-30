const Product = require("../model/Product");

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ADD PRODUCT (Admin only - Updated for multiple images and specifications)
const addProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Only admin can add product" });
    }
    const { name, price, image, images, description, longDescription, category, stock, specifications } = req.body;
    
    const product = await Product.create({ 
      name, price, image, images, description, longDescription, category, stock, specifications 
    });
    
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE PRODUCT (Admin only)
const deleteProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Only admin can delete" });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET SINGLE PRODUCT BY ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { addProduct, getProducts, deleteProduct, getProductById };