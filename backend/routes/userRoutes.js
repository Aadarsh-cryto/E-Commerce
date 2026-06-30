const express = require("express");
const router = express.Router();
const {
  registerUser,
  verify,
  reverify,
  login,
  logout,
  forgotpass,
  verifyOtp,
  changePassword,
  getAllUser,
  getUserById,
} = require("../controller/authController");

const { isAuthenticated } = require("../middleware/authenticated");

router.post("/register", registerUser);
router.post("/verify-email", verify);
router.post("/reverify", reverify);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);

router.get("/users", isAuthenticated, getAllUser);
router.get("/user/:id", isAuthenticated, getUserById);

module.exports = router;