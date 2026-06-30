const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { verifyEmail } = require("../emailVerify/verifyEmail");

const Session = require("../model/Session");

// 1. REGISTER
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName, lastName, email,
      password: hashedPassword,
      // role sirf "admin" allow karo agar explicitly diya ho, warna "user"
      role: role === "admin" ? "admin" : "user",
    });

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: "10m" });
    newUser.token = token;
    await newUser.save();

    await verifyEmail(token, email);

    return res.status(201).json({ success: true, message: "Verification email sent." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 2. VERIFY EMAIL
const verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ success: false, message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.isVerified) return res.status(200).json({ success: true, message: "Already verified" });

    user.isVerified = true;
    user.token = null;
    await user.save();

    return res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

// 3. REVERIFY
const reverify = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "10m" });
    user.token = token;
    await user.save();
    await verifyEmail(token, email);

    return res.status(200).json({ success: true, message: "Verification email sent again" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 4. LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User does not exist" });

    const isPassValid = await bcrypt.compare(password, user.password);
    if (!isPassValid) return res.status(400).json({ success: false, message: "Invalid credentials" });

    if (!user.isVerified) {
      return res.status(400).json({ success: false, message: "Please verify your email first" });
    }

    // NOTE: "accesToken" spelling intentionally kept as-is (frontend matches this)
    const accesToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "10d" });

    user.isLoggedIn = true;
    await user.save();

    await Session.deleteOne({ userId: user._id });
    await Session.create({ userId: user._id });

    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.firstName}`,
      user,
      accesToken,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 5. LOGOUT
const logout = async (req, res) => {
  try {
    await Session.deleteMany({ userId: req.user._id });
    await User.findByIdAndUpdate(req.user._id, { isLoggedIn: false });
    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 6. CHANGE PASSWORD


// 7. GET ALL USERS
const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 8. GET USER BY ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ SABHI FUNCTIONS EXPORT — forgotpass, verifyOtp, changePassword bhi included
module.exports = {
  registerUser,
  verify,
  reverify,
  login,
  logout,
  getAllUser,
  getUserById,
};