import axios from "axios";
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_LOGIN_REQUEST",
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userinfo", JSON.stringify(data));
  } catch (e) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload: e.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_REGISTER_REQUEST",
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    dispatch({
      type: "USER_REGISTER_SUCCESS",
      payload: data,
    });

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userinfo", JSON.stringify(data));
  } catch (e) {
    dispatch({
      type: "USER_REGISTER_FAIL",
      payload: e.message,
    });
  }
};

export const getuserdetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_DETAILS_REQUEST",
    });

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
    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: "USER_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: "USER_DETAILS_FAIL",
      payload: e.message,
    });
  }
};

export const updateuserdetails = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_UPDATE_PROFILE_REQUEST",
    });

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
    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: "USER_UPDATE_PROFILE_SUCCESS",
      payload: data,
    });

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });
    localStorage.setItem("userinfo", JSON.stringify(data));
  } catch (e) {
    dispatch({
      type: "USER_UPDATE_PROFILE_FAIL",
      payload: e.message,
    });
  }
};
export const getusers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_LIST_REQUEST",
    });

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
    const { data } = await axios.get("/api/users", config);

    dispatch({
      type: "USER_LIST_SUCCESS",
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: "USER_LIST_FAIL",
      payload: e.message,
    });
  }
};

export const deleteusers = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_DELETE_REQUEST",
    });

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
    await axios.delete(`/api/users/${id}`, config);

    dispatch({
      type: "USER_DELETE_SUCCESS",
    });
  } catch (e) {
    dispatch({
      type: "USER_DELETE_FAIL",
      payload: e.message,
    });
  }
};

export const updateuser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_UPDATE_REQUEST",
    });

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
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({
      type: "USER_UPDATE_SUCCESS",
      payload: data,
    });

    dispatch({
      type: "USER_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: "USER_UPDATE_FAIL",
      payload: e.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userinfo");
  dispatch({ type: "USER_LOGOUT" });
  dispatch({ type: "USER_DETAILS_RESET" });
  dispatch({ type: "ORDER_LIST_MY_RESET" });
  dispatch({ type: "USER_LIST_RESET" });
  dispatch({ type: "CART_RESET_ITEM" });
};
