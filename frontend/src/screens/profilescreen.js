import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getuserdetails, updateuserdetails } from "../actions/useraction";
import { myorderlist } from "../actions/orderactions";

const Profilescreen = (props) => {
  const [formstate, setstate] = useState({
    email: "",
    password: "",
    name: "",
    confirmpassword: "",
    message: null,
  });
  const dispatch = useDispatch();

  const userdetails = useSelector((state) => state.userdetails);
  const { loading, error, user } = userdetails;

  const userlogin = useSelector((state) => state.userlogin);
  const { userinfo } = userlogin;

  const userupdateprofile = useSelector((state) => state.userupdateprofile);
  const { success } = userupdateprofile;

  const orderlistmy = useSelector((state) => state.orderlistmy);
  const {
    loading: loadingmyorders,
    error: errormyorders,
    orders,
  } = orderlistmy;

  useEffect(() => {
    if (!userinfo) {
      props.history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({
          type: "USER_UPDATE_PROFILE_RESET",
        });
        dispatch(getuserdetails("profile"));
        dispatch(myorderlist());
      } else {
        setstate((prev) => {
          return { ...prev, name: user.name, email: user.email };
        });
      }
    }
  }, [dispatch, props.history, userinfo, user, success]);

  const submithandler = (e) => {
    e.preventDefault();
    if (formstate.password !== formstate.confirmpassword) {
      setstate((prev) => {
        return { ...prev, message: "Passwords do not match" };
      });
    } else {
      dispatch(
        updateuserdetails({
          id: user._id,
          name: formstate.name,
          email: formstate.email,
          password: formstate.password,
        })
      );
    }
  };
  const handlechange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setstate((prev) => {
        return { ...prev, email: value };
      });
    } else if (name === "password") {
      setstate((prev) => {
        return { ...prev, password: value };
      });
    } else if (name === "name") {
      setstate((prev) => {
        return { ...prev, name: value };
      });
    } else if (name === "confirmpassword") {
      setstate((prev) => {
        return { ...prev, confirmpassword: value };
      });
    }
  };

  return;
};

export default Profilescreen;
