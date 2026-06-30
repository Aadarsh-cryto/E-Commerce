import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/ui/Navbar";
import Hero from "../components/ui/Hero";
import Features from "../components/Features";

export default function Home() {
  // --- STATES ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);

  // --- NAVIGATION AUR REF ---
  const navigate = useNavigate();
  const productsRef = useRef(null);

  // --- 1. PRODUCTS GET KARNA (SIMPLE .then() SE) ---
  useEffect(() => {
    // Axios se plain API call
    axios.get("http://localhost:5000/api/v1/product")
      .then(function (response) {
        // Agar response me products hain, toh state me save karo
        if (response.data && response.data.products) {
          setProducts(response.data.products);
        } else {
          setProducts([]);
        }
        setLoading(false); // Loading khatam
      })
      .catch(function (error) {
        console.error("Product load nahi ho paye:", error);
        setLoading(false); // Error aaye toh bhi loading band karo
      });
  }, []);

  // --- 2. SMOOTH SCROLL FUNCTION ---
  const scrollToProducts = () => {
    if (productsRef.current !== null) {
      productsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // --- 3. CART ME ADD KARNA (SIMPLE .then() SE) ---
  const addToCart = (productId) => {
    const token = localStorage.getItem("accessToken");

    // Check karo user login hai ya nahi
    if (!token) {
      alert("Please login first!");
      navigate("/login");
      return; 
    }

    // Loading chalu karo (Button par 'Adding...' dikhane ke liye)
    setAddingId(productId);

    // Axios POST request ka aasan tarika
    const url = "http://localhost:5000/api/v1/cart/add";
    const bodyData = { productId: productId, quantity: 1 };
    const config = {
      headers: { Authorization: "Bearer " + token },
      withCredentials: true
    };

    axios.post(url, bodyData, config)
      .then(function (response) {
        alert("Added to cart! 🛒");
        setAddingId(null); // Loading band
      })
      .catch(function (error) {
        // Agar backend se koi error message aaya hai toh wo dikhao
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("Failed to add to cart");
        }
        setAddingId(null); // Error aane par bhi loading band
      });
  };

  return (
    <div style={{ backgroundColor: "#0b1329", minHeight: "100vh", color: "white", fontFamily: "sans-serif" }}>
      
      <Navbar />
      
      <main style={{ paddingTop: "80px" }}>
        <Hero onShopNowClick={scrollToProducts} />
        <Features />

        {/* --- PRODUCTS SECTION --- */}
        <section ref={productsRef} style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
            <h2 style={{ fontSize: "28px", margin: "0" }}>Our Featured Products</h2>
            <button 
              onClick={() => navigate("/products")}
              style={{ padding: "10px 20px", background: "#1e293b", color: "white", border: "1px solid #334155", borderRadius: "8px", cursor: "pointer" }}
            >
              View All Products
            </button>
          </div>

          {/* --- LOADING STATE --- */}
          {loading === true ? (
            <div style={{ textAlign: "center", fontSize: "20px", padding: "50px", color: "#94a3b8" }}>
              Loading products...
            </div>
          ) : null}

          {/* --- EMPTY PRODUCTS STATE --- */}
          {loading === false && products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "50px", background: "#1e293b", borderRadius: "12px", color: "#94a3b8" }}>
              No products found.
            </div>
          ) : null}

          {/* --- PRODUCTS LIST STATE --- */}
          {loading === false && products.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "25px" }}>
              {products.slice(0, 4).map(function (item) {
                return (
                  <div
                    key={item._id}
                    onClick={() => navigate("/product/" + item._id)}
                    style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}
                  >
                    {/* Image */}
                    <div style={{ background: "#030712", borderRadius: "12px", height: "200px", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", marginBottom: "15px" }}>
                      <img
                        src={item.image ? item.image : "https://via.placeholder.com/150"}
                        alt={item.name}
                        style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 style={{ fontSize: "18px", margin: "0 0 8px 0" }}>{item.name}</h3>
                      <p style={{ fontSize: "14px", color: "#94a3b8", margin: "0 0 15px 0" }}>
                        {item.description ? item.description : "No description available"}
                      </p>
                    </div>

                    {/* Price & Action */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "15px", borderTop: "1px solid #1f2937" }}>
                      <span style={{ fontSize: "18px", fontWeight: "bold", color: "#06b6d4" }}>
                        ₹{item.price}
                      </span>
                      <button
                        onClick={function (e) {
                          e.stopPropagation(); // Card pe click na ho, sirf button kaam kare
                          addToCart(item._id);
                        }}
                        disabled={addingId === item._id}
                        style={{ background: "#06b6d4", color: "#030712", border: "none", padding: "8px 16px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", opacity: addingId === item._id ? 0.5 : 1 }}
                      >
                        {addingId === item._id ? "Adding..." : "Add To Cart"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}

        </section>
      </main>
    </div>
  );
}