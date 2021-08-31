import express from "express";
import { protect, admin } from "../middleware/authmiddleware.js";
// import Product from '../models/productmodel.js'
// import asynchandler from 'express-async-handler'

import {
  createproduct,
  getproductbyid,
  gettopproducts,
  deleteproduct,
  updateproduct,
} from "../controllers/productcontroller.js";

const router = express.Router();

// router.route("/").get(getproduct).post(protect, admin, createproduct);
router.route("/").post(protect, admin, createproduct);
router.get("/top", gettopproducts);

// router.route('/:id/reviews').post(protect,admin,productreviews)

router
  .route("/:id")
  .get(getproductbyid)
  .delete(protect, admin, deleteproduct)
  .put(protect, admin, updateproduct);

export default router;
