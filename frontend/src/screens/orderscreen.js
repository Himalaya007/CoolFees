import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deliverorders,
  getorderdetails,
  payorder,
} from "../actions/orderactions";
import axios from "axios";

const Orderscreen = (props) => {
  const cart = useSelector((state) => state.cart);

  const [sdkready, setsdkready] = useState(false);

  const dispatch = useDispatch();

  const orderdetails = useSelector((state) => state.orderdetails);
  const { order, loading, error } = orderdetails;

  const userlogin = useSelector((state) => state.userlogin);
  const { userinfo } = userlogin;

  const orderpay = useSelector((state) => state.orderpay);
  const { loading: loadingpay, success: successpay } = orderpay;

  const orderdeliver = useSelector((state) => state.orderdeliver);
  const { loading: loadingdeliver, success: successdeliver } = orderdeliver;

  useEffect(() => {
    if (!userinfo) {
      props.history.push("/login");
    }
    const addpaypalscript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setsdkready(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successpay || successdeliver) {
      dispatch({ type: "ORDER_PAY_RESET" });
      dispatch({ type: "ORDER_DELIVER_RESET" });
      dispatch(getorderdetails(props.match.params.id));
    } else if (!order.ispaid) {
      if (!window.paypal) {
        addpaypalscript();
      } else {
        setsdkready(true);
      }
    }
  }, [dispatch, props.match.params.id, successpay, order, successdeliver]);

  if (!loading) {
    order.itemprice = order.orderitems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  }

  // const itemprice=cart.cartitems.reduce((sum,item)=>sum+item.price*item.qty,0)

  const successpaymenthandler = (paymentresult) => {
    console.log(paymentresult);

    dispatch(payorder(props.match.params.id));
  };

  const deliverhandler = () => {
    dispatch(deliverorders(props.match.params.id));
  };

  return;
};

export default Orderscreen;
