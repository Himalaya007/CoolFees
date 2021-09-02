import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listproductdetails, updateproduct } from "../actions/productactions";
import axios from "axios";

const Producteditscreen = (props) => {
  const [formstate, setstate] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    brand: "",
    category: "",
    countInStock: 0,
    numreviews: 0,
    uploading: false,
  });
  const dispatch = useDispatch();

  const productdetails = useSelector((state) => state.productdetails);
  const { loading, error, product } = productdetails;

  const productupdate = useSelector((state) => state.productupdate);
  const {
    loading: loadingupdate,
    success: successupdate,
    error: errorupdate,
    product: Productupdate,
  } = productupdate;

  useEffect(() => {
    if (successupdate) {
      dispatch({ type: "PRODUCT_UPDATE_RESET" });
      props.history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== props.match.params.id) {
        dispatch(listproductdetails(props.match.params.id));
      } else {
        setstate((prev) => {
          return {
            ...prev,
            name: product.name,
            price: product.price,
            brand: product.brand,
            image: product.image,
            category: product.category,
            countInStock: product.countInStock,
            description: product.description,
            numreviews: formstate.numreviews,
          };
        });
      }
    }
  }, [dispatch, product, props.match.params.id, successupdate, props.history]);

  const submithandler = (e) => {
    e.preventDefault();

    dispatch(
      updateproduct({
        _id: props.match.params.id,
        name: formstate.name,
        image: formstate.image,
        price: formstate.price,
        category: formstate.category,
        brand: formstate.brand,
        description: formstate.description,
        countInStock: formstate.countInStock,
        numreviews: formstate.numreviews,
      })
    );
    setstate({
      name: formstate.name,
      image: formstate.image,
      price: formstate.price,
      category: formstate.category,
      brand: formstate.brand,
      description: formstate.description,
      countInStock: formstate.countInStock,
      numreviews: formstate.numreviews,
    });
  };
  const handlechange = (e) => {
    const { name, value } = e.target;

    setstate((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const uploadhandler = async (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("image", file);
    setstate((prev) => {
      return { ...prev, uploading: true };
    });

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/formdata",
        },
      };

      const { data } = await axios.post("/api/upload", formdata, config);
      setstate((prev) => {
        return { ...prev, image: data, uploading: false };
      });
    } catch (error) {
      console.log(error);
      setstate((prev) => {
        return { ...prev, uploading: false };
      });
    }
  };

  return;
};

export default Producteditscreen;
