import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtocart, removefromcart } from "../actions/cartactions";

const Cartscreen = (props) => {
  const productid = props.match.params.id;

  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productid) {
      dispatch(addtocart(productid, qty));
    }
  }, [dispatch, productid, qty]);

  const removecarthandler = (id) => {
    dispatch(removefromcart(id));
  };

  const checkouthandler = () => {
    props.history.push("/login?redirect=shipping");
  };

  const cart = useSelector((state) => state.cart);
  const { cartitems } = cart;

  console.log(qty);

  return;
};

export default Cartscreen;
