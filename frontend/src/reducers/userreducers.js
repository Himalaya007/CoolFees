export const userloginreducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };

    case "USER_LOGIN_SUCCESS":
      return { loading: false, userinfo: action.payload };
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

export const userregisterreducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };

    case "USER_REGISTER_SUCCESS":
      return { loading: false, userinfo: action.payload };
    case "USER_REGISTER_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userdetailsreducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "USER_DETAILS_REQUEST":
      return { loading: true };

    case "USER_DETAILS_SUCCESS":
      return { loading: false, userinfo: action.payload };
    case "USER_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    case "USER_DETAILS_RESET":
      return {};
    default:
      return state;
  }
};

export const userupdateprofilereducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_UPDATE_PROFILE_REQUEST":
      return { loading: true };

    case "USER_UPDATE_PROFILE_SUCCESS":
      return { loading: false, userinfo: action.payload };
    case "USER_UPDATE_PROFILE_FAIL":
      return { loading: false, success: true, error: action.payload };
    case "USER_UPDATE_PROFILE_RESET":
      return {};
    default:
      return state;
  }
};
export const userlistreducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case "USER_LIST_REQUEST":
      return { loading: true };

    case "USER_LIST_SUCCESS":
      return { loading: false, userinfo: action.payload };
    case "USER_LIST_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LIST_RESET":
      return { users: [] };
    default:
      return state;
  }
};
export const userdeletereducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_DELETE_REQUEST":
      return { loading: true };

    case "USER_DELETE_SUCCESS":
      return { loading: false, userinfo: action.payload };
    case "USER_DELETE_FAIL":
      return { loading: false, error: action.payload };
    case "USER_DELETE_RESET":
      return { users: [] };
    default:
      return state;
  }
};
export const userupdatereducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_UPDATE_REQUEST":
      return { loading: true };
    case "USER_UPDATE_SUCCESS":
      return { loading: false, success: true };
    case "USER_UPDATE_FAIL":
      return { loading: false, error: action.payload };
    case "USER_UPDATE_RESET":
      return {};
    default:
      return state;
  }
};
