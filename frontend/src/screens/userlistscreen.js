import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getusers } from "../actions/useraction";
import { deleteusers } from "../actions/useraction";

const Userlistscreen = (props) => {
  const dispatch = useDispatch();

  const userlist = useSelector((state) => state.userlist);
  const { users, loading, error } = userlist;

  const userlogin = useSelector((state) => state.userlogin);
  const { userinfo } = userlogin;

  const userdelete = useSelector((state) => state.userdelete);
  const { success: successdelete } = userdelete;

  useEffect(() => {
    if (userinfo && userinfo.isAdmin) {
      dispatch(getusers());
    } else {
      props.history.push("/login");
    }
  }, [dispatch, props.history, userinfo, successdelete]);

  const deletehandler = (id) => {
    if (window.confirm("Are you sure to delete this")) {
      dispatch(deleteusers(id));
    }
  };

  return;
};

export default Userlistscreen;
