import express, { Request, Response } from "express";
import Product from "../models/Product";

const router = express.Router();

// GET all products
router.get("/", async (req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
});

// POST new product
router.post("/", async (req: Request, res: Response) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

// DELETE product
router.delete("/:id", async (req: Request, res: Response) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product Deleted ✅" });
});

// UPDATE product
router.put("/:id", async (req: Request, res: Response) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedProduct);
});

export default router;