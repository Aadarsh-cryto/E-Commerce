import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showpass, setShowPass] = useState(false);
  
  // Single object state for all form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });

  // Ek hi handler jo saare inputs ka data handle karega
  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    
    setFormData({ 
      ...formData, 
      [inputName]: inputValue 
    });
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.post(
      "http://localhost:5000/api/v1/user/register",
      formData,
      { headers: { "Content-Type": "application/json" } }
    )
    .then(function (res) {
      if (res.data && res.data.success) {
        alert("Verification email sent successfully. 📧");
        navigate("/check-email");
      }
      setLoading(false);
    })
    .catch(function (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong.");
      }
      setLoading(false);
    });
  };

  return (
    <div style={{ backgroundColor: "#0f172a", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "15px", fontFamily: "sans-serif" }}>
      
      {/* Form Card Box */}
      <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "12px", width: "100%", maxWidth: "400px", color: "#000000", boxSizing: "border-box" }}>

        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "bold", margin: "0 0 5px 0" }}>Create your account</h2>
          <p style={{ color: "#64748b", fontSize: "14px", margin: "0" }}>Enter your details below.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

          {/* Name Row (First Name & Last Name Side by Side) */}
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ width: "50%" }}>
              <label style={{ fontSize: "14px", fontWeight: "500", display: "block", marginBottom: "5px" }}>First Name</label>
              <input
                type="text" 
                name="firstName" 
                value={formData.firstName}
                onChange={handleChange} 
                required
                style={{ width: "100%", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "10px", boxSizing: "border-box" }}
              />
            </div>
            
            <div style={{ width: "50%" }}>
              <label style={{ fontSize: "14px", fontWeight: "500", display: "block", marginBottom: "5px" }}>Last Name</label>
              <input
                type="text" 
                name="lastName" 
                value={formData.lastName}
                onChange={handleChange} 
                required
                style={{ width: "100%", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "10px", boxSizing: "border-box" }}
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label style={{ fontSize: "14px", fontWeight: "500", display: "block", marginBottom: "5px" }}>Email</label>
            <input
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange} 
              required
              style={{ width: "100%", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "10px", boxSizing: "border-box" }}
            />
          </div>

          {/* Password Input with Toggle Text Button */}
          <div>
            <label style={{ fontSize: "14px", fontWeight: "500", display: "block", marginBottom: "5px" }}>Password</label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type={showpass === true ? "text" : "password"} 
                name="password"
                value={formData.password} 
                onChange={handleChange} 
                required
                style={{ width: "100%", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "10px", paddingRight: "50px", boxSizing: "border-box" }}
              />
              
              {/* Simple Text-based Show/Hide Button instead of Lucide Icon */}
              <button
                type="button"
                onClick={function () { setShowPass(!showpass); }}
                style={{ position: "absolute", right: "10px", background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}
              >
                {showpass === true ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          {/* Role Dropdown */}
          <div>
            <label style={{ fontSize: "14px", fontWeight: "500", display: "block", marginBottom: "5px" }}>Register as</label>
            <select
              name="role" 
              value={formData.role} 
              onChange={handleChange}
              style={{ width: "100%", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "10px", backgroundColor: "white", boxSizing: "border-box" }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading === true}
            style={{ width: "100%", backgroundColor: "black", color: "white", border: "none", borderRadius: "8px", padding: "12px", fontSize: "15px", fontWeight: "bold", cursor: "pointer", marginTop: "10px", opacity: loading === true ? 0.6 : 1 }}
          >
            {loading === true ? "Please Wait... 🔄" : "Signup"}
          </button>

          {/* Login Redirect Link */}
          <p style={{ fontSize: "14px", textAlign: "center", margin: "10px 0 0 0" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "black", fontWeight: "bold", textDecoration: "underline" }}>Login</Link>
          </p>

        </form>
      </div>
    </div>
  );
}