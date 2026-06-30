import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/ui/Navbar";

export default function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // --- SIMPLE TEXT & NUMBER STATES ---
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [longDescription, setLongDescription] = useState(""); 
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  // --- DYNAMIC ARRAY STATES ---
  const [extraImages, setExtraImages] = useState([""]); 
  const [specifications, setSpecifications] = useState([{ key: "", value: "" }]);

  // --- TOKEN AND HEADERS ---
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: { Authorization: "Bearer " + token },
    withCredentials: true
  };

  // --- 1. EXTRA IMAGES HANDLERS (SIMPLE WAY) ---
  const handleAddImageField = () => {
    setExtraImages([...extraImages, ""]); // Ek khali string array me jod di
  };

  const handleRemoveImageField = (indexToRemove) => {
    const updated = extraImages.filter(function (_, index) {
      return index !== indexToRemove;
    });
    setExtraImages(updated);
  };

  const handleImageChange = (indexToUpdate, value) => {
    const updated = [...extraImages];
    updated[indexToUpdate] = value;
    setExtraImages(updated);
  };

  // --- 2. SPECIFICATIONS HANDLERS (SIMPLE WAY) ---
  const handleAddSpecRow = () => {
    setSpecifications([...specifications, { key: "", value: "" }]); // Ek khali object matrix me joda
  };

  const handleRemoveSpecRow = (indexToRemove) => {
    const updated = specifications.filter(function (_, index) {
      return index !== indexToRemove;
    });
    setSpecifications(updated);
  };

  const handleSpecChange = (indexToUpdate, fieldName, value) => {
    const updated = [...specifications];
    updated[indexToUpdate][fieldName] = value;
    setSpecifications(updated);
  };

  // --- 3. SUBMIT FORM DATA ---
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      alert("Unauthorized! Please login as Admin.");
      return;
    }

    setLoading(true);

    // Khali pade links aur khali fields ko filter karke saaf karna
    const filteredImages = extraImages.filter(function (img) {
      return img.trim() !== "";
    });

    const filteredSpecs = specifications.filter(function (spec) {
      return spec.key.trim() !== "" && spec.value.trim() !== "";
    });

    // Backend bhejte waqt object tyar kiya
    const productData = {
      name: name,
      price: Number(price),
      image: image,
      images: filteredImages,
      description: description,
      longDescription: longDescription,
      category: category,
      stock: Number(stock),
      specifications: filteredSpecs
    };

    axios.post("http://localhost:5000/api/v1/product", productData, config)
      .then(function () {
        alert("Product Added Successfully! 🎉");
        navigate("/products");
        setLoading(false);
      })
      .catch(function (error) {
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("Failed to add product");
        }
        setLoading(false);
      });
  };

  return (
    <div style={{ backgroundColor: "#0b1329", minHeight: "100vh", color: "white", fontFamily: "sans-serif", paddingTop: "100px", paddingBottom: "50px" }}>
      <Navbar />

      <main style={{ maxWidth: "700px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "14px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "5px" }}
        >
          ⬅️ Back
        </button>

        {/* Form Container */}
        <div style={{ backgroundColor: "#111827", border: "1px solid #1f2937", padding: "30px", borderRadius: "16px" }}>
          
          <h2 style={{ fontSize: "24px", margin: "0 0 25px 0", color: "#06b6d4" }}>
            Add New <span style={{ color: "white" }}>Product</span>
          </h2>
          
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "col", flexFlow: "column", gap: "20px" }}>
            
            {/* Name and Price */}
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <div style={{ flex: "1", minWidth: "200px" }}>
                <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "5px" }}>PRODUCT TITLE</label>
                <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. iPhone 14 Pro" style={{ width: "100%", padding: "10px", background: "#030712", border: "1px solid #1f2937", borderRadius: "8px", color: "white", boxSizing: "border-box" }} />
              </div>
              <div style={{ flex: "1", minWidth: "200px" }}>
                <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "5px" }}>PRICE (₹)</label>
                <input required type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 79999" style={{ width: "100%", padding: "10px", background: "#030712", border: "1px solid #1f2937", borderRadius: "8px", color: "white", boxSizing: "border-box" }} />
              </div>
            </div>

            {/* Category and Stock */}
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <div style={{ flex: "1", minWidth: "200px" }}>
                <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "5px" }}>CATEGORY</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Mobiles" style={{ width: "100%", padding: "10px", background: "#030712", border: "1px solid #1f2937", borderRadius: "8px", color: "white", boxSizing: "border-box" }} />
              </div>
              <div style={{ flex: "1", minWidth: "200px" }}>
                <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "5px" }}>STOCK QUANTITY</label>
                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="e.g. 50" style={{ width: "100%", padding: "10px", background: "#030712", border: "1px solid #1f2937", borderRadius: "8px", color: "white", boxSizing: "border-box" }} />
              </div>
            </div>

            {/* Thumbnail Image Link */}
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "5px" }}>MAIN THUMBNAIL IMAGE URL</label>
              <input required type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Paste main image link" style={{ width: "100%", padding: "10px", background: "#030712", border: "1px solid #1f2937", borderRadius: "8px", color: "white", boxSizing: "border-box" }} />
            </div>

            {/* Short Description */}
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "5px" }}>SHORT DESCRIPTION</label>
              <input required type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A short catchphrase..." style={{ width: "100%", padding: "10px", background: "#030712", border: "1px solid #1f2937", borderRadius: "8px", color: "white", boxSizing: "border-box" }} />
            </div>

            {/* Long Description */}
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "5px" }}>DETAILED LONG DESCRIPTION</label>
              <textarea rows={4} value={longDescription} onChange={(e) => setLongDescription(e.target.value)} placeholder="Write full specifications..." style={{ width: "100%", padding: "10px", background: "#030712", border: "1px solid #1f2937", borderRadius: "8px", color: "white", boxSizing: "border-box", resize: "none" }} />
            </div>

            {/* --- DYNAMIC SUB-IMAGES SECTION --- */}
            <div style={{ borderTop: "1px solid #1f2937", paddingTop: "15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <label style={{ fontSize: "12px", color: "#06b6d4", fontWeight: "bold" }}>EXTRA SUB-IMAGES URLS</label>
                <button type="button" onClick={handleAddImageField} style={{ padding: "5px 10px", background: "#030712", border: "1px solid #1f2937", color: "white", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>
                  ➕ Add Image Link
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {extraImages.map(function (imgUrl, index) {
                  return (
                    <div key={index} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <input type="text" value={imgUrl} onChange={(e) => handleImageChange(index, e.target.value)} placeholder={"Sub-Image " + (index + 1) + " URL Link"} style={{ flex: "1", padding: "10px", background: "#030712", border: "1px solid #1f2937", borderRadius: "8px", color: "white", boxSizing: "border-box" }} />
                      {extraImages.length > 1 ? (
                        <button type="button" onClick={() => handleRemoveImageField(index)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "16px" }}>🗑️</button>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* --- DYNAMIC SPECIFICATIONS TABLE SECTION --- */}
            <div style={{ borderTop: "1px solid #1f2937", paddingTop: "15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <label style={{ fontSize: "12px", color: "#06b6d4", fontWeight: "bold" }}>TECHNICAL SPECIFICATIONS TABLE</label>
                <button type="button" onClick={handleAddSpecRow} style={{ padding: "5px 10px", background: "#030712", border: "1px solid #1f2937", color: "white", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>
                  ➕ Add Attribute Row
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {specifications.map(function (spec, index) {
                  return (
                    <div key={index} style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                      <input type="text" value={spec.key} onChange={(e) => handleSpecChange(index, "key", e.target.value)} placeholder="Key (e.g. RAM)" style={{ flex: "1", minWidth: "120px", padding: "10px", background: "#030712", border: "1px solid #1f2937", borderRadius: "8px", color: "white", boxSizing: "border-box" }} />
                      <input type="text" value={spec.value} onChange={(e) => handleSpecChange(index, "value", e.target.value)} placeholder="Value (e.g. 8 GB)" style={{ flex: "2", minWidth: "180px", padding: "10px", background: "#030712", border: "1px solid #1f2937", borderRadius: "8px", color: "white", boxSizing: "border-box" }} />
                      {specifications.length > 1 ? (
                        <button type="button" onClick={() => handleRemoveSpecRow(index)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "16px" }}>🗑️</button>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading === true}
              style={{ width: "100%", marginTop: "15px", background: "#06b6d4", color: "#030712", border: "none", padding: "14px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "14px", opacity: loading === true ? 0.6 : 1 }}
            >
              {loading === true ? "Creating Product... 🔄" : "Save Product Details"}
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}