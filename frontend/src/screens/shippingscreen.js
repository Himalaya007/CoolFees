import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveshippingaddress } from "../actions/cartactions";

const Shippingscreen = (props) => {
  const cart = useSelector((state) => state.cart);
  const { shippingaddress } = cart;

  const [address, setaddress] = useState(shippingaddress.address);
  const [city, setcity] = useState(shippingaddress.city);
  const [postalcode, setpostalcode] = useState(shippingaddress.postalcode);
  const [country, setcountry] = useState(shippingaddress.country);

  const dispatch = useDispatch();

  const submithandler = (e) => {
    e.preventDefault();
    dispatch(saveshippingaddress({ address, city, postalcode, country }));
    props.history.push("/payment");
  };

  return;
};

export default Shippingscreen;
