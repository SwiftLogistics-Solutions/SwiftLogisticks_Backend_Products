import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import productRouter from "./routes/productRouter.js";
dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
