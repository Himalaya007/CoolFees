import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listproducts,
  deleteproduct,
  createproduct,
} from "../actions/productactions";

const Productlistscreen = (props) => {
  const dispatch = useDispatch();

  const pageNumber = props.match.params.pageNumber;

  const productlist = useSelector((state) => state.productlist);
  const { products, page, pages, loading, error } = productlist;

  const userlogin = useSelector((state) => state.userlogin);
  const { userinfo } = userlogin;

  const productdelete = useSelector((state) => state.productdelete);
  const {
    error: errordelete,
    loading: loadingdelete,
    success: successdelete,
  } = productdelete;

  const productcreate = useSelector((state) => state.productcreate);
  const {
    product: Createproduct,
    loading: Createloading,
    error: Createerror,
    success: Createsuccess,
  } = productcreate;

  useEffect(() => {
    dispatch({ type: "PRODUCT_CREATE_RESET" });
    if (!userinfo.isAdmin) {
      props.history.push("/login");
    }
    if (Createsuccess) {
      props.history.push(`/admin/product/${Createproduct._id}/edit`);
    } else {
      dispatch(listproducts("", pageNumber));
    }
  }, [
    dispatch,
    props.history,
    userinfo,
    successdelete,
    Createsuccess,
    Createproduct,
    pageNumber,
  ]);

  const deletehandler = (id) => {
    if (window.confirm("Are you sure to delete this")) {
      dispatch(deleteproduct(id));
    }
  };
  const createproducthandler = () => {
    dispatch(createproduct());
  };

  return;
};

export default Productlistscreen;
