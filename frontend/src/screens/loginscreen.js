import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/useraction";

const Loginscreen = (props) => {
  const [formstate, setstate] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const userlogin = useSelector((state) => state.userlogin);
  const { loading, error, userinfo } = userlogin;

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (userinfo) {
      props.history.push(redirect);
    }
  }, [props.history, userinfo]);

  const submithandler = (e) => {
    e.preventDefault();
    dispatch(login(formstate.email, formstate.password));
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
    }
  };

  return;
};

export default Loginscreen;
