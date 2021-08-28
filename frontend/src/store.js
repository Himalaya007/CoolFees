import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({});

const initialstate = {};

const middleware = [thunk];
const store = createStore(
  reducers,
  initialstate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
