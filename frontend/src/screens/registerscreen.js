import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/useraction";

const Registerscreen = (props) => {
  const [formstate, setstate] = useState({
    email: "",
    password: "",
    name: "",
    confirmpassword: "",
    message: null,
  });
  const dispatch = useDispatch();

  const userregister = useSelector((state) => state.userregister);
  const { loading, error, userinfo } = userregister;

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (userinfo) {
      props.history.push("/");
    }
  }, [props.history, userinfo]);

  const submithandler = (e) => {
    e.preventDefault();
    if (formstate.password !== formstate.confirmpassword) {
      setstate((prev) => {
        return { ...prev, message: "Passwords do not match" };
      });
    } else {
      dispatch(register(formstate.name, formstate.email, formstate.password));
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

export default Registerscreen;
