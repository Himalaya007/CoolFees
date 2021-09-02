import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuserdetails, updateuser } from "../actions/useraction";

const Usereditscreen = (props) => {
  const [formstate, setstate] = useState({
    email: "",
    password: "",
    isAdmin: false,
    message: null,
  });
  const dispatch = useDispatch();

  const userdetails = useSelector((state) => state.userdetails);
  const { loading, error, user } = userdetails;

  const userupdate = useSelector((state) => state.userupdate);
  const {
    loading: loadingupdate,
    error: errorupdate,
    success: successupdate,
  } = userupdate;

  useEffect(() => {
    if (successupdate) {
      dispatch({ type: "USER_UPDATE_RESET" });
      props.history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== props.match.params.id) {
        dispatch(getuserdetails(props.match.params.id));
      } else {
        setstate((prev) => {
          return {
            ...prev,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          };
        });
      }
    }
  }, [dispatch, user, successupdate]);

  const submithandler = (e) => {
    e.preventDefault();
    dispatch(
      updateuser({
        _id: props.match.params.id,
        name: formstate.name,
        email: formstate.email,
        isAdmin: formstate.isAdmin,
      })
    );
  };
  const handlechange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setstate((prev) => {
        return { ...prev, email: value };
      });
    } else if (name === "isAdmin") {
      setstate((prev) => {
        return { ...prev, isAdmin: e.target.checked };
      });
    } else if (name === "name") {
      setstate((prev) => {
        return { ...prev, name: value };
      });
    }
  };

  return;
};

export default Usereditscreen;
