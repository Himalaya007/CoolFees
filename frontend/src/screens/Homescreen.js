import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listproducts } from "../actions/productactions";

const Homescreen = (props) => {
  const keyword = props.match.params.keyword;

  const pageNumber = props.match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productlist = useSelector((state) => state.productlist);
  if (productlist) {
    const { loading, error, products, page, pages } = productlist;
  }

  useEffect(() => {
    dispatch(listproducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return;
};

export default Homescreen;
