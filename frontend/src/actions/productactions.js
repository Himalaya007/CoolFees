import axios from "axios";

export const listproducts =
  (keyword = "", pagenumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: "PRODUCT_LIST_REQUEST" });

      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pagenumber}`
      );

      dispatch({
        type: "PRODUCT_LIST_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "PRODUCT_LIST_FAIL",
        payload: error.message,
      });
    }
  };

export const listproductdetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "PRODUCT_REQUEST",
    });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: "PRODUCT_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_FAIL",
      payload: error.message,
    });
  }
};

export const deleteproduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "PRODUCT_DELETE_REQUEST",
    });

    const {
      userlogin: { userinfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userinfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: "PRODUCT_DELETE_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_DELETE_FAIL",
      payload: error.message,
    });
  }
};

export const createproduct = (id) => (dispatch, getState) => {
  try {
    dispatch({
      type: "PRODUCT_CREATE_REQUEST",
    });

    const {
      userlogin: { userinfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userinfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, {}, config);
    dispatch({
      type: "PRODUCT_CREATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_CREATE_FAIL",
      payload: error.message,
    });
  }
};

export const updateproduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PRODUCT_UPDATE_REQUEST" });

    const {
      userlogin: { userinfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userinfo.token}`,
      },
      //getstate gives userlogin state form which we need userinfo which stores token and other info.
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: "PRODUCT_UPDATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_UPDATE_FAIL",
      payload: error.message,
    });
  }
};

export const createproductreview =
  (id, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: "PRODUCT_CREATE_REVIEW_REQUEST" });

      const {
        userlogin: { userinfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userinfo.token}`,
        },
        //getstate gives userlogin state form which we need userinfo which stores token and other info.
      };

      await axios.post(`/api/products/${id}/reviews`, review, config);

      dispatch({
        type: "PRODUCT_CREATE_REVIEW_SUCCESS",
      });
    } catch (error) {
      dispatch({
        type: "PRODUCT_CREATE_REVIEW_FAIL",
        payload: error.message,
      });
    }
  };

export const listtopproducts = () => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_TOP_REQUEST" });
    const { data } = await axios.get("/api/products/top");

    dispatch({
      type: "PRODUCT_TOP_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_TOP_FAIL",
      payload: error.message,
    });
  }
};
