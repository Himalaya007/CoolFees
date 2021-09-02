import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allorders } from "../actions/orderactions";

const Orderlistscreen = (props) => {
  const dispatch = useDispatch();

  const userlogin = useSelector((state) => state.userlogin);
  const { userinfo } = userlogin;

  const Allorders = useSelector((state) => state.orderall);
  const { loading, error, success, orders } = Allorders;

  useEffect(() => {
    if (!userinfo.isAdmin) {
      props.history.push("/login");
    }
    // if(Createsuccess){
    //     props.history.push(`/admin/product/${Createproduct._id}/edit`)
    // }
    else {
      dispatch(allorders());
    }
  }, [dispatch, props.history, userinfo]);

  // const deletehandler=(id)=>{
  // if(window.confirm('Are you sure to delete this')){
  //  dispatch(deleteproduct(id))}

  //     }
  //     const createproducthandler=()=>{
  // dispatch(createproduct())
  //     }

  return;
};

export default Orderlistscreen;
