import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // --- LOCAL STORAGE SE USER DATA NIKALNA ---
  useEffect(() => {
    const data = localStorage.getItem("user");
    
    // Agar user data nahi milta toh login par bhej do
    if (!data) { 
      navigate("/login"); 
      return; 
    }
    
    setUser(JSON.parse(data));
  }, []);

  // Jab tak user state load na ho, kuch mat dikhao
  if (user === null) {
    return null;
  }

  // Name ka pehla akshar nikalne ke liye safe variables
  let firstInitial = "";
  let lastInitial = "";
  if (user.firstName) { firstInitial = user.firstName[0].toUpperCase(); }
  if (user.lastName) { lastInitial = user.lastName[0].toUpperCase(); }

  return (
    <div style={{ backgroundColor: "#0b1329", minHeight: "100vh", color: "white", fontFamily: "sans-serif", paddingTop: "100px", paddingBottom: "50px", paddingLeft: "15px", paddingRight: "15px" }}>
      
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>

        {/* --- HEADER CARD --- */}
        <div style={{ backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "16px", padding: "25px", marginBottom: "25px", display: "flex", alignItems: "center", gap: "20px" }}>
          
          {/* Avatar circle */}
          <div style={{ width: "70px", height: "70px", borderRadius: "50%", backgroundColor: "#06b6d4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "bold", color: "#030712" }}>
            {firstInitial}{lastInitial}
          </div>
          
          <div>
            <h1 style={{ fontSize: "22px", margin: "0 0 5px 0" }}>{user.firstName} {user.lastName}</h1>
            <p style={{ margin: "0 0 10px 0", color: "#94a3b8", fontSize: "14px" }}>{user.email}</p>
            
            {/* Admin ya User Badge */}
            <span style={{ 
              display: "inline-block", 
              padding: "4px 12px", 
              borderRadius: "20px", 
              fontSize: "12px", 
              fontWeight: "bold",
              backgroundColor: user.role === "admin" ? "rgba(16,185,129,0.2)" : "rgba(6,182,212,0.2)",
              color: user.role === "admin" ? "#34d399" : "#22d3ee",
              border: user.role === "admin" ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(6,182,212,0.3)"
            }}>
              {user.role === "admin" ? "👑 Admin" : "👤 User"}
            </span>
          </div>

        </div>

        {/* --- ACCOUNT DETAILS CONTAINER --- */}
        <div style={{ backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "16px", padding: "25px", display: "flex", flexDirection: "column", gap: "15px" }}>
          
          <h2 style={{ fontSize: "18px", color: "#cbd5e1", margin: "0 0 10px 0" }}>Account Details</h2>

          {/* Full Name */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px", padding: "12px", backgroundColor: "#030712", borderRadius: "12px" }}>
            <span style={{ fontSize: "20px" }}>👤</span>
            <div>
              <p style={{ margin: "0 0 2px 0", fontSize: "11px", color: "#64748b", textTransform: "uppercase" }}>Full Name</p>
              <p style={{ margin: "0", fontSize: "15px", fontWeight: "500" }}>{user.firstName} {user.lastName}</p>
            </div>
          </div>

          {/* Email */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px", padding: "12px", backgroundColor: "#030712", borderRadius: "12px" }}>
            <span style={{ fontSize: "20px" }}>✉️</span>
            <div>
              <p style={{ margin: "0 0 2px 0", fontSize: "11px", color: "#64748b", textTransform: "uppercase" }}>Email Address</p>
              <p style={{ margin: "0", fontSize: "15px", fontWeight: "500" }}>{user.email}</p>
            </div>
          </div>

          {/* Role */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px", padding: "12px", backgroundColor: "#030712", borderRadius: "12px" }}>
            <span style={{ fontSize: "20px" }}>🛡️</span>
            <div>
              <p style={{ margin: "0 0 2px 0", fontSize: "11px", color: "#64748b", textTransform: "uppercase" }}>Account Role</p>
              <p style={{ margin: "0", fontSize: "15px", fontWeight: "500", textTransform: "capitalize" }}>{user.role}</p>
            </div>
          </div>

          {/* Phone */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px", padding: "12px", backgroundColor: "#030712", borderRadius: "12px" }}>
            <span style={{ fontSize: "20px" }}>📞</span>
            <div>
              <p style={{ margin: "0 0 2px 0", fontSize: "11px", color: "#64748b", textTransform: "uppercase" }}>Phone</p>
              <p style={{ margin: "0", fontSize: "15px", fontWeight: "500" }}>{user.phoneNo ? user.phoneNo : "Not provided"}</p>
            </div>
          </div>

          {/* Address */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px", padding: "12px", backgroundColor: "#030712", borderRadius: "12px" }}>
            <span style={{ fontSize: "20px" }}>📍</span>
            <div>
              <p style={{ margin: "0 0 2px 0", fontSize: "11px", color: "#64748b", textTransform: "uppercase" }}>Address</p>
              <p style={{ margin: "0", fontSize: "15px", fontWeight: "500" }}>
                {user.address ? user.address + ", " + user.city + " - " + user.zipCode : "Not provided"}
              </p>
            </div>
          </div>

        </div>

        {/* --- VERIFICATION STATUS BADGE --- */}
        <div style={{ marginTop: "20px", backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "16px", padding: "20px", display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ fontSize: "28px" }}>{user.isVerified === true ? "✅" : "⚠️"}</span>
          <div>
            <p style={{ margin: "0 0 4px 0", fontWeight: "bold", fontSize: "15px" }}>
              {user.isVerified === true ? "Email Verified" : "Email Not Verified"}
            </p>
            <p style={{ margin: "0", fontSize: "13px", color: "#94a3b8" }}>
              {user.isVerified === true ? "Your account is fully verified." : "Please verify your email."}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}