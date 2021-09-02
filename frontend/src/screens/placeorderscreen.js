import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createorder } from "../actions/orderactions";

const Placeorderscreen = (props) => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  cart.itemprice = cart.cartitems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  cart.shippingprice = cart.itemprice > 100 ? 0 : 100;

  cart.taxprice = Number((0.15 * cart.itemprice).toFixed(2));

  cart.totalprice = Number(
    (cart.itemprice + cart.shippingprice + cart.taxprice).toFixed(2)
  );

  const ordercreate = useSelector((state) => state.ordercreate);

  const { order, success, error } = ordercreate;

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
    }
  }, [props.history, success]);

  const placeorder = () => {
    dispatch(
      createorder({
        orderitems: cart.cartitems,
        shippingaddress: cart.shippingaddress,
        paymentmethod: cart.paymentmethod,
        itemprice: cart.itemprice,
        shippingprice: cart.shippingprice,
        taxprice: cart.taxprice,
        totalprice: cart.totalprice,
      })
    );
  };

  return;
};

export default Placeorderscreen;
