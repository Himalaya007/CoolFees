
import express from 'express'
import {protect,admin} from '../middleware/authmiddleware.js'
// import Product from '../models/productmodel.js'
// import asynchandler from 'express-async-handler'
import {addorderitems,getorderbyid,updateordertopaid,getmyorders,getallorders,updateordertodelivered} from '../controllers/ordercontroller.js'

const router=express.Router()

router.route('/').post(protect,addorderitems).get(protect,admin,getallorders)
router.route('/myorders').get(protect,getmyorders)
router.route('/:id').get(protect,getorderbyid)
router.route('/:id/pay').put(protect,updateordertopaid)
router.route('/:id/deliver').put(protect,updateordertodelivered)

export default router