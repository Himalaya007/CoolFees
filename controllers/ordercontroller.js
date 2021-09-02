import asynchandler from "express-async-handler";
import Order from "../models/ordermodel.js";

export const addorderitems = asynchandler(async (req, res) => {
  const {
    orderitems,
    shippingaddress,
    paymentmethod,
    itemsprice,
    taxprice,
    shippingprice,
    totalprice,
  } = req.body;

  if (orderitems && orderitems.length === 0) {
    res.status(400);
    throw new Error("NO order item");
    return;
  } else {
    const order = new Order({
      User: req.user._id,
      orderitems,
      shippingaddress,
      paymentmethod,
      itemsprice,
      taxprice,
      shippingprice,
      totalprice,
    });

    const createdorder = await order.save();

    res.status(201).json(createdorder);
  }
});

export const getorderbyid = asynchandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "User",
    "email name"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404).send();
  }
});

export const updateordertopaid = asynchandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.ispaid = true;
    order.paidat = Date.now();
    order.paymentresult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedorder = await order.save();
    res.json(updatedorder);
  } else {
    res.status(404).send();
  }
});

export const getmyorders = asynchandler(async (req, res) => {
  const orders = await Order.find({ User: req.user._id });
  console.log(req.user._id);
  console.log(orders);

  res.json(orders);
});

export const getallorders = asynchandler(async (req, res) => {
  const orders = await Order.find({}).populate("User", "id name");
  console.log(req.user._id);
  console.log(orders);

  res.json(orders);
});

export const updateordertodelivered = asynchandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isdelivered = true;
    order.deliveredat = Date.now();

    const updatedorder = await order.save();
    res.json(updatedorder);
  } else {
    res.status(404).send();
  }
});
