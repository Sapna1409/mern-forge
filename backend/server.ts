import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // .env file ko load karega
console.log("ENV CHECK:", process.env.MONGO_URI);

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error("MONGO_URI not found in .env");
}

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB connection error:", err));

// Express App
const app = express();
app.use(cors());
app.use(express.json());
import productRoutes from "./routes/product";

app.use("/api/products", productRoutes);

// Test Route
app.get("/", (req: Request, res: Response) => {
  res.send("MERNForge Backend Running ✅");
});

// Server Start
const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});