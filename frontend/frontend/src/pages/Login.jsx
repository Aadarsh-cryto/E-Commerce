import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  // --- SIMPLE STATES ---
  // Har ek cheez ke liye alag aur simple state banayi hai
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpass, setShowpass] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- INPUT CHANGE FUNCTIONS ---
  // Ekdum simple functions jo input ki value ko state me save karte hain
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // --- SUBMIT FUNCTION (SIMPLE .then() SE) ---
  const handleSubmit = (e) => {
    e.preventDefault(); // Page refresh hone se rokne ke liye

    setLoading(true); // Loading chalu karo

    // Dono states se data lekar ek simple object banaya
    const bodyData = {
      email: email,
      password: password
    };

    // Axios POST request ka sabse aasan tarika
    axios.post("http://localhost:5000/api/v1/user/login", bodyData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    })
    .then(function (res) {
      // Agar backend se success true aata hai
      if (res.data.success === true) {
        localStorage.setItem("accessToken", res.data.accesToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        navigate("/"); // Home page par bhejo
      }
      setLoading(false); // Loading band
    })
    .catch(function (error) {
      // Agar koi error aata hai toh check karke alert dikhao
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Login Failed");
      }
      setLoading(false); // Error aane par bhi loading band
    });
  };

  return (
    <div style={{ backgroundColor: "#0f172a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "sans-serif" }}>
      
      <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "12px", width: "100%", maxWidth: "400px", color: "#334155" }}>
        
        {/* Header Text */}
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "24px", margin: "0 0 5px 0", color: "#0f172a" }}>Login to your account</h2>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "0" }}>Enter your details below</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          
          {/* Email Input */}
          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", boxSizing: "border-box" }}
              required
            />
          </div>

          {/* Password Input aur Show/Hide Button */}
          <div style={{ marginBottom: "20px", position: "relative" }}>
            <input
              type={showpass === true ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              style={{ width: "100%", padding: "10px", paddingRight: "70px", border: "1px solid #cbd5e1", borderRadius: "6px", boxSizing: "border-box" }}
              required
            />
            
            {/* Show/Hide Text Button */}
            <button
              type="button"
              onClick={() => setShowpass(!showpass)}
              style={{ position: "absolute", right: "10px", top: "10px", background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}
            >
              {showpass === true ? "HIDE" : "SHOW"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading === true}
            style={{ width: "100%", backgroundColor: "#000000", color: "white", padding: "12px", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", opacity: loading === true ? 0.5 : 1 }}
          >
            {loading === true ? "Please Wait..." : "Login"}
          </button>

          {/* Signup Link */}
          <p style={{ textAlign: "center", marginTop: "15px", fontSize: "14px", color: "#64748b" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#000000", fontWeight: "bold", textDecoration: "underline" }}>
              Signup
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;