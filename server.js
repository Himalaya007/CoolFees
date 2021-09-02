import express from "express";
import connect from "./config/db.js";
import Userroute from "./routes/userroute.js";
const app = express();

connect();

app.use(express.json());
app.use("/api/users", Userroute);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
