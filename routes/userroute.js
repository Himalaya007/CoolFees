import express from "express";
import { protect, admin } from "../middleware/authmiddleware.js";
// import Product from '../models/productmodel.js'
// import asynchandler from 'express-async-handler'
import {
  createuser,
  loginuser,
  getuserbyid,
  getuserprofile,
  getusers,
  updateuserbyid,
  updateuserprofile,
  deleteuser,
} from "../controllers/usercontroller.js";

const router = express.Router();

router.route("/").post(createuser).get(protect, admin, getusers);
router.post("/login", loginuser);
router
  .route("/profile")
  .get(protect, getuserprofile)
  .put(protect, updateuserprofile);
router
  .route("/:id")
  .delete(protect, admin, deleteuser)
  .get(protect, admin, getuserbyid)
  .put(protect, admin, updateuserbyid);

export default router;
