import Product from "../models/productmodel.js";
import asynchandler from "express-async-handler";

export const getproduct = asynchandler(async (req, res) => {
  const pagesize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pagesize)
    .skip(pagesize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pagesize) });
});

export const getproductbyid = asynchandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send(e);
  }
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

export const createproduct = asynchandler(async (req, res) => {
  const product = new Product({
    name: "sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numreviews: 0,
    description: "sample description",
  });
  const newproduct = await product.save();
  res.status(201).json(newproduct);
});

export const updateproduct = asynchandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
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
      (product.description = description);
  }

  const updatedproduct = await product.save();
  res.status(201).json(updatedproduct);
});

export const productreviews = asynchandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyreviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyreviewed) {
      throw new Error("Product already reviewed!");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);

    product.numreviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((sum, item) => sum + item.rating, 0) /
      product.numreviews;

    await product.save();

    res.status(201).send("review added");
  }

  const updatedproduct = await product.save();
  res.status(201).json(updatedproduct);
});

export const gettopproducts = asynchandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});
