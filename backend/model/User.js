const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    profilePic: {
      type: String,
      default: "",
    },

    profilePublicId: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    token: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isLoggedIn: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
      default: null,
    },

    otpExpiry: {
      type: Date,
      default: null,
    },

    address: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    zipCode: {
      type: String,
      default: "",
    },

    phoneNo: {
      type: String,
      default: "",
    },

    // 🛒 CART ARRAY: Isko main schema fields wale block ke andar le aaya hoon
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true, // Options block ab yahan sahi jagah par hai
  }
);

module.exports = mongoose.model("User", UserSchema);