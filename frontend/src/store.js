import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userdeletereducer,
  userdetailsreducer,
  userlistreducer,
  userloginreducer,
  userregisterreducer,
  userupdateprofilereducer,
  userupdatereducer,
} from "./reducers/userreducers";

const reducers = combineReducers({
  userlogin: userloginreducer,
  userdelete: userdeletereducer,
  userdetails: userdetailsreducer,
  userlist: userlistreducer,
  userregister: userregisterreducer,
  userupdateprofile: userupdateprofilereducer,
  userupdate: userupdatereducer,
});
const userinfofromstorage = localStorage.getItem("userinfo")
  ? JSON.parse(localStorage.getItem("userinfo"))
  : null;

const initialstate = {
  userlogin: {
    userinfo: userinfofromstorage,
  },
};

const middleware = [thunk];
const store = createStore(
  reducers,
  initialstate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
