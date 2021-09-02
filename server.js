import express from "express";
import connect from "./config/db.js";
import Userroute from "./routes/userroute.js";
import Productroute from "./routes/productroute.js";
import Orderroute from "./routes/orderroute.js";

const app = express();

connect();

app.use(express.json());
app.use("/api/users", Userroute);
app.use("/api/products", Productroute);
app.use("/api/orders", Orderroute);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
