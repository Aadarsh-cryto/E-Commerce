const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // Main cover photo
  images: [{ type: String }], // Flipkart style extra photos array
  description: { type: String }, // Single line short description
  longDescription: { type: String }, // Bada Flipkart style description box
  category: { type: String },
  stock: { type: Number, default: 0 },
  specifications: [
    {
      key: { type: String },   // e.g., "RAM"
      value: { type: String }  // e.g., "8 GB"
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);