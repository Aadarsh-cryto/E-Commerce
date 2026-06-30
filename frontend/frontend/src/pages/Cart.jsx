import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/ui/Navbar";

export default function Cart() {
  const navigate = useNavigate();

  // --- SIMPLE STATES ---
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // --- TOKEN AUR HEADERS CONFIG ---
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: { Authorization: "Bearer " + token },
    withCredentials: true
  };

  // --- 1. CART ITEMS GET KARNA ---
  const fetchCart = () => {
    axios.get("http://localhost:5000/api/v1/cart", config)
      .then(function (res) {
        if (res.data && res.data.items) {
          setItems(res.data.items);
        } else {
          setItems([]);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.error("Cart data load nahi hua:", error);
        // Fallback: Agar backend route abhi ready nahi hai toh empty array set karke crash bachao
        setItems([]); 
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // --- 2. ITEM CART SE REMOVE KARNA ---
  const handleRemove = (productId) => {
    axios.delete("http://localhost:5000/api/v1/cart/remove/" + productId, config)
      .then(function () {
        const updatedItems = items.filter(function (item) {
          return item.product && item.product._id !== productId;
        });
        setItems(updatedItems);
      })
      .catch(function () {
        alert("Failed to remove item");
      });
  };

  // --- 3. QUANTITY PLUS YA MINUS KARNA ---
  const handleQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemove(productId);
      return;
    }

    const bodyData = { 
      productId: productId, 
      quantity: newQuantity 
    };

    axios.put("http://localhost:5000/api/v1/cart/update", bodyData, config)
      .then(function () {
        const updatedItems = items.map(function (item) {
          if (item.product && item.product._id === productId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        setItems(updatedItems);
      })
      .catch(function () {
        alert("Failed to update quantity");
      });
  };

  // --- 4. 🎯 PURE FRONTEND FAKE PAYMENT HANDLING (No Backend Connection) ---
  const handleFakePayment = (e) => {
    e.preventDefault();
    setPaymentLoading(true);

    // 2 second ka fake loading lagane ke liye setTimeout
    setTimeout(function () {
      setPaymentLoading(false);
      setPaymentSuccess(true);
      setItems([]); // Local frontend state se cart saaf kiya taaki zero dikhe

      // Payment success hone ke 2.5 second baad modal band karke redirect karo
      setTimeout(function () {
        setShowPaymentModal(false);
        setPaymentSuccess(false);
        navigate("/products");
      }, 2500);

    }, 2000); // 2 second ka process time loop
  };

  // --- 5. TOTAL PRICE NIKALNA ---
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].product) {
      total = total + (items[i].product.price * items[i].quantity);
    }
  }

  // --- LOADING UI ---
  if (loading === true) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0b1329", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
        Loading Cart... ⏳
      </div>
    );
  }

  // --- EMPTY CART UI ---
  if (items.length === 0 && showPaymentModal === false) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0b1329", color: "white", fontFamily: "sans-serif" }}>
        <Navbar />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "150px", textAlign: "center" }}>
          <div style={{ fontSize: "50px" }}>🛒</div>
          <h2 style={{ fontSize: "28px", margin: "10px 0" }}>Your cart is empty</h2>
          <p style={{ color: "#94a3b8", marginBottom: "20px" }}>Looks like you haven't added anything yet.</p>
          <Link to="/products" style={{ background: "#06b6d4", color: "#030712", padding: "12px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold" }}>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0b1329", color: "white", fontFamily: "sans-serif", paddingTop: "100px", paddingBottom: "50px" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px", display: "flex", gap: "30px", flexWrap: "wrap" }}>
        
        {/* --- LEFT SIDE: CART ITEMS LIST --- */}
        <div style={{ flex: "2", minWidth: "300px" }}>
          <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Your Cart</h1>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {items.map(function (item) {
              if (!item.product) return null;

              return (
                <div 
                  key={item.product._id} 
                  style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "15px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "15px" }}
                >
                  {/* Image */}
                  <div style={{ width: "70px", height: "70px", background: "#030712", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", padding: "5px" }}>
                    <img src={item.product.image} alt={item.product.name} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                  </div>

                  {/* Name & Price */}
                  <div style={{ flex: "1", minWidth: "150px" }}>
                    <h3 style={{ margin: "0 0 5px 0", fontSize: "16px" }}>{item.product.name}</h3>
                    <p style={{ margin: "0", color: "#06b6d4", fontWeight: "bold" }}>₹{item.product.price?.toLocaleString()}</p>
                  </div>

                  {/* Plus/Minus Buttons */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button 
                      onClick={() => handleQuantity(item.product._id, item.quantity - 1)} 
                      style={{ width: "30px", height: "30px", background: "#030712", border: "1px solid #1f2937", color: "white", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
                    >
                      -
                    </button>
                    <span style={{ width: "20px", textAlign: "center", fontWeight: "bold" }}>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantity(item.product._id, item.quantity + 1)} 
                      style={{ width: "30px", height: "30px", background: "#030712", border: "1px solid #1f2937", color: "white", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
                    >
                      +
                    </button>
                  </div>

                  {/* Row Total & Delete */}
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <span style={{ fontWeight: "bold", minWidth: "80px", textAlign: "right" }}>
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                    <button 
                      onClick={() => handleRemove(item.product._id)} 
                      style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "16px" }}
                    >
                      ❌
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* --- RIGHT SIDE: ORDER SUMMARY --- */}
        <div style={{ flex: "1", minWidth: "280px", background: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "20px", height: "fit-content" }}>
          <h2 style={{ margin: "0 0 15px 0", fontSize: "20px" }}>Order Summary</h2>
          
          <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8", marginBottom: "10px", fontSize: "14px" }}>
            <span>Items Subtotal:</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8", marginBottom: "15px", fontSize: "14px" }}>
            <span>Shipping:</span>
            <span style={{ color: "#10b981", fontWeight: "bold" }}>FREE</span>
          </div>

          <div style={{ borderTop: "1px solid #1f2937", paddingTop: "15px", display: "flex", justifyContent: "space-between", fontSize: "20px", fontWeight: "bold" }}>
            <span>Total:</span>
            <span style={{ color: "#06b6d4" }}>₹{total.toLocaleString()}</span>
          </div>

          <button 
            onClick={() => setShowPaymentModal(true)} 
            style={{ width: "100%", marginTop: "20px", background: "#06b6d4", color: "#030712", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "14px" }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

      </div>

      {/* --- FAKE PAYMENT MODAL --- */}
      {showPaymentModal === true ? (
        <div style={{ position: "fixed", inset: "0", backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", zIndex: "100" }}>
          <div style={{ background: "#111827", border: "1px solid #1f2937", padding: "25px", borderRadius: "16px", width: "100%", maxWidth: "400px" }}>
            
            {paymentSuccess === true ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <div style={{ fontSize: "50px", color: "#10b981" }}>✅</div>
                <h3 style={{ fontSize: "22px", margin: "10px 0" }}>Order Placed!</h3>
                <p style={{ color: "#94a3b8", fontSize: "14px" }}>Redirecting you to catalog...</p>
              </div>
            ) : paymentLoading === true ? (
              <div style={{ textAlign: "center", padding: "30px" }}>
                <div style={{ fontSize: "40px" }} className="animate-spin">🔄</div>
                <h3 style={{ fontSize: "18px", margin: "10px 0" }}>Processing Payment...</h3>
              </div>
            ) : (
              <form onSubmit={handleFakePayment}>
                <h3 style={{ margin: "0 0 15px 0", fontSize: "18px", borderBottom: "1px solid #1f2937", paddingBottom: "10px" }}>💳 Payment Gateway</h3>
                
                <div style={{ background: "#075985", padding: "10px", borderRadius: "8px", marginBottom: "15px", display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                  <span>Total Payable:</span>
                  <span style={{ fontWeight: "bold" }}>₹{total.toLocaleString()}</span>
                </div>

                <div style={{ bundle: "block", marginBottom: "12px" }}>
                  <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "5px" }}>CARD NUMBER</label>
                  <input required type="text" maxLength={16} placeholder="4000123456789010" style={{ width: "100%", padding: "10px", background: "#030712", border: "1px solid #1f2937", borderRadius: "6px", color: "white", boxSizing: "border-box" }} />
                </div>

                <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
                  <div style={{ flex: "1" }}>
                    <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "5px" }}>EXPIRY</label>
                    <input required type="text" maxLength={5} placeholder="MM/YY" style={{ width: "100%", padding: "10px", background: "#030712", border: "1px solid #1f2937", borderRadius: "6px", color: "white", boxSizing: "border-box", textAlign: "center" }} />
                  </div>
                  <div style={{ flex: "1" }}>
                    <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "5px" }}>CVV</label>
                    <input required type="password" maxLength={3} placeholder="***" style={{ width: "100%", padding: "10px", background: "#030712", border: "1px solid #1f2937", borderRadius: "6px", color: "white", boxSizing: "border-box", textAlign: "center" }} />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", borderTop: "1px solid #1f2937", paddingTop: "15px" }}>
                  <button type="button" onClick={() => setShowPaymentModal(false)} style={{ flex: "1", padding: "10px", background: "#030712", border: "1px solid #1f2937", color: "#94a3b8", borderRadius: "6px", cursor: "pointer" }}>
                    Cancel
                  </button>
                  <button type="submit" style={{ flex: "2", padding: "10px", background: "#06b6d4", border: "none", color: "#030712", fontWeight: "bold", borderRadius: "6px", cursor: "pointer" }}>
                    PAY NOW
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      ) : null}

    </div>
  );
}