require("dotenv").config();

const express = require("express");
const cors = require("cors");

const ConnectToDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

ConnectToDb();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));