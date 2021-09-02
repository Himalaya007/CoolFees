import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Registerscreen from "./screens/registerscreen";
import Loginscreen from "./screens/loginscreen";
import Profilescreen from "./screens/profilescreen";
import Shippingscreen from "./screens/Shippingscreen";
import Paymentscreen from "./screens/Paymentscreen";
import Placeorderscreen from "./screens/placeorderscreen";
import Orderscreen from "./screens/Orderscreen";
import Productscreen from "./screens/productscreen";
import Home from "./screens/Homescreen";
import Cartscreen from "./screens/cartscreen";
import Userlistscreen from "./screens/userlistscreen";
import Productlistscreen from "./screens/Productlistscreen";
import Producteditscreen from "./screens/productscreen";
import Usereditscreen from "./screens/Usereditscreen";
import Orderlistscreen from "./screens/Orderlistscreen";

function App() {
  return (
    // <Router>
    //   <Route path='/' component={Registerscreen} exact></Route>
    //   <Route path='/login' component={Loginscreen}></Route>
    // </Router>
    <Router>
      <Route path='/login' component={Loginscreen}></Route>
      <Route path='/register' component={Registerscreen}></Route>
      <Route path='/profile' component={Profilescreen}></Route>
      <Route path='/shipping' component={Shippingscreen}></Route>
      <Route path='/payment' component={Paymentscreen}></Route>
      <Route path='/placeorder' component={Placeorderscreen}></Route>
      <Route path='/order/:id' component={Orderscreen}></Route>
      <Route path='/' component={Home} exact></Route>
      <Route path='/products/:id' component={Productscreen}></Route>
      <Route path='/cart/:id?' component={Cartscreen}></Route>
      <Route path='/admin/userlist' component={Userlistscreen}></Route>
      <Route path='/admin/user/:id/edit' component={Usereditscreen}></Route>
      <Route
        path='/admin/productlist'
        component={Productlistscreen}
        exact
      ></Route>
      <Route
        path='/admin/productlist/:pageNumber'
        component={Productlistscreen}
        exact
      ></Route>
      <Route
        path='/admin/product/:id/edit'
        component={Producteditscreen}
      ></Route>
      <Route path='/admin/orderlist' component={Orderlistscreen}></Route>
    </Router>
  );
}

export default App;
