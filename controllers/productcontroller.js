import Product from "../models/productmodel";
import asynchandler from "express-async-handler";

export const createproduct = asynchandler(async (req, res) => {
  const product = new Product({
    name: "sample dress",
    price: 0,
    user: req.user._id,
    image: "ok",
    brand: "zara",
    category: "women",
    countinstock: 0,
    numreviews: 0,
    size: "M",
    description: "sample product",
  });

  const newproduct = await product.save();
  res.status(201).json(newproduct);
});

export const getproductbyid = asynchandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send(e);
  }
});

export const updateproduct = asynchandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    size,
    countInStock,
    numreviews,
    description,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    (product.name = name),
      (product.price = price),
      (product.image = image),
      (product.brand = brand),
      (product.category = category),
      (product.countInStock = countInStock),
      (product.numreviews = numreviews),
      (product.description = description),
      (product.size = size);
  } else {
    res.status(404).send("Product Not Found");
  }

  const updatedproduct = await product.save();
  res.status(201).json(updatedproduct);
});

export const gettopproducts = asynchandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export const deleteproduct = asynchandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "product removed" });
  } else {
    res.status(404).send(e);
  }
});
