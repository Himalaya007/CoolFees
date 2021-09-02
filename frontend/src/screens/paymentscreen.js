import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { savepaymentmethod } from "../actions/cartactions";

const Paymentscreen = (props) => {
  const cart = useSelector((state) => state.cart);
  const { shippingaddress } = cart;

  if (!shippingaddress) {
    props.history.push("/shipping");
  }

  const [paymentmethod, setmethod] = useState("");

  const dispatch = useDispatch();

  const submithandler = (e) => {
    e.preventDefault();
    dispatch(savepaymentmethod(paymentmethod));
    props.history.push("/placeorder");
  };

  return;
};

export default Paymentscreen;
