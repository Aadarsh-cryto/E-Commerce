import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [totalCartCount, setTotalCartCount] = useState(0);

  // --- PAGE LOAD HOTE HI LOCAL STORAGE SE USER AUR CART COUNT NIKALNA ---
  useEffect(function () {
    // 1. User ka data nikalna
    const localUserData = localStorage.getItem("user");
    if (localUserData) {
      setLoggedInUser(JSON.parse(localUserData));
    }

    // 2. Cart ka count direct local storage se nikalna (Bina backend API ke)
    const localCartData = localStorage.getItem("cartItems");
    if (localCartData) {
      const itemsArray = JSON.parse(localCartData);
      let countSum = 0;
      for (let i = 0; i < itemsArray.length; i++) {
        countSum = countSum + itemsArray[i].quantity;
      }
      setTotalCartCount(countSum);
    }
  }, []);

  // --- LOGOUT CLICK HANDLER ---
  const handleUserLogout = function () {
    // Bina backend call kiye direct frontend se hi saaf kar do
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("cartItems"); // Cart bhi clear kar do
    setLoggedInUser(null);
    setTotalCartCount(0);
    navigate("/login");
  };

  return (
    <header style={{ position: "fixed", top: "0", left: "0", width: "100%", backgroundColor: "#020617", borderBottom: "1px solid #1e293b", color: "white", zIndex: "1000", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", height: "70px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px" }}>

        {/* WEBSITE LOGO */}
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <h1 style={{ fontSize: "20px", fontWeight: "900", margin: "0" }}>
            SHOP<span style={{ color: "#06b6d4" }}>HUB</span>
          </h1>
        </Link>

        {/* NAV MENUS */}
        <nav style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          
          <Link to="/" style={{ color: "#cbd5e1", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>Home</Link>
          <Link to="/products" style={{ color: "#cbd5e1", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>Products</Link>

          {/* ADMIN SPECIAL AREA */}
          {loggedInUser && loggedInUser.role === "admin" ? (
            <Link to="/add-product" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.4)", color: "#10b981", padding: "6px 12px", borderRadius: "8px", textDecoration: "none", fontSize: "12px", fontWeight: "bold" }}>
              Add Product
            </Link>
          ) : null}

          {/* GREETING TEXT */}
          {loggedInUser ? (
            <Link to="/profile" style={{ color: "#cbd5e1", textDecoration: "none", fontSize: "14px" }}>
              Hello, <span style={{ color: "white", fontWeight: "bold" }}>{loggedInUser.firstName}</span>
            </Link>
          ) : null}

          {/* CART SYSTEM BADGE */}
          <Link to="/cart" style={{ position: "relative", display: "flex", alignItems: "center", background: "#0f172a", border: "1px solid #334155", padding: "8px", borderRadius: "8px", textDecoration: "none" }}>
            <span style={{ fontSize: "18px" }}>🛒</span>
            {totalCartCount > 0 ? (
              <span style={{ position: "absolute", top: "-5px", right: "-5px", backgroundColor: "#06b6d4", color: "#020617", fontSize: "10px", fontWeight: "bold", width: "16px", height: "16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {totalCartCount > 9 ? "9+" : totalCartCount}
              </span>
            ) : null}
          </Link>

          {/* LOGIN YA LOGOUT KA SWITCH BUTTON */}
          {loggedInUser ? (
            <button
              onClick={handleUserLogout}
              style={{ background: "#0f172a", border: "1px solid #334155", color: "#f87171", padding: "8px 16px", borderRadius: "8px", fontWeight: "bold", fontSize: "12px", cursor: "pointer" }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button style={{ background: "#06b6d4", border: "none", color: "#020617", padding: "8px 16px", borderRadius: "8px", fontWeight: "bold", fontSize: "12px", cursor: "pointer" }}>
                Login
              </button>
            </Link>
          )}

        </nav>
      </div>
    </header>
  );
}