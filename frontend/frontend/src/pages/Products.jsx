import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/ui/Navbar";

export default function Products() {
  const [productsArray, setProductsArray] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    axios.get("http://localhost:5000/api/v1/product")
      .then(function (response) {
        if (response.data && response.data.products) {
          setProductsArray(response.data.products);
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error("Products load nahi ho paye:", error);
        setIsLoading(false);
      });
  }, []);

  const filteredProducts = productsArray.filter(function (singleProduct) {
    let productName = "";
    if (singleProduct.name) {
      productName = singleProduct.name.toLowerCase();
    }
    let userSearch = searchText.toLowerCase();
    return productName.includes(userSearch);
  });

  if (isLoading === true) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0b1329", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", fontFamily: "sans-serif" }}>
        Products Load Ho Rahe Hain... ⏳
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#0b1329", minHeight: "100vh", color: "white", fontFamily: "sans-serif", paddingTop: "100px", paddingBottom: "50px" }}>
      <Navbar />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "15px", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: "0" }}>All Products</h1>
          
          <input 
            type="text"
            placeholder="Search product name..."
            value={searchText}
            onChange={function (event) { setSearchText(event.target.value); }}
            style={{ padding: "12px 15px", borderRadius: "8px", border: "1px solid #1f2937", backgroundColor: "#111827", color: "white", width: "100%", maxWidth: "300px", fontSize: "14px", boxSizing: "border-box" }}
          />
        </div>

        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px", color: "#94a3b8" }}>
            <p style={{ fontSize: "18px" }}>No products found! 🔍</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "25px" }}>
            {filteredProducts.map(function (productItem) {
              return (
                <div 
                  key={productItem._id} 
                  style={{ backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "12px", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "15px" }}
                >
                  <div style={{ height: "200px", backgroundColor: "#030712", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", marginBottom: "15px" }}>
                    <img 
                      src={productItem.image || "https://via.placeholder.com/200"} 
                      alt={productItem.name} 
                      style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} 
                    />
                  </div>

                  <div style={{ flexGrow: "1", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 5px 0", color: "white", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                        {productItem.name}
                      </h3>
                      <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 10px 0", height: "35px", overflow: "hidden" }}>
                        {productItem.description}
                      </p>
                    </div>

                    <div>
                      <p style={{ fontSize: "20px", fontWeight: "bold", color: "#06b6d4", margin: "0 0 15px 0" }}>
                        ₹{productItem.price}
                      </p>

                      <Link to={"/product/" + productItem._id} style={{ textDecoration: "none" }}>
                        <button style={{ width: "100%", backgroundColor: "#06b6d4", color: "#030712", border: "none", padding: "10px", borderRadius: "8px", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}>
                          View Details 👀
                        </button>
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>
    </div>
  );
}