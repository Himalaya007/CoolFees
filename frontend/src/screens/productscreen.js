import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listproductdetails,
  createproductreview,
} from "../actions/productactions";

const Productscreen = (props) => {
  const [qty, setqty] = useState(1);
  const [rating, setrating] = useState(0);
  const [comment, setcomment] = useState("");

  const dispatch = useDispatch();

  const productdetail = useSelector((state) => state.productdetails);
  const { loading, product, error } = productdetail;

  const productreviewcreate = useSelector((state) => state.productreviewcreate);
  const {
    loading: loadingreview,
    product: productreview,
    error: errorreview,
    success: successreview,
  } = productreviewcreate;

  const userlogin = useSelector((state) => state.userlogin);
  const { userinfo } = userlogin;

  useEffect(() => {
    if (successreview) {
      alert("Review Submitted!");
      setrating(0);
      setcomment("");
      dispatch({ type: "PRODUCT_CREATE_REVIEW_RESET" });
    }
    dispatch(listproductdetails(props.match.params.id));
  }, [dispatch, props.match, successreview]);

  const addtocarthandler = () => {
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
  };

  const submithandler = (e) => {
    e.preventDefault();
    dispatch(
      createproductreview(props.match.params.id, {
        rating,
        comment,
      })
    );
  };
  return;
};

export default Productscreen;
