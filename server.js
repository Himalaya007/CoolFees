import expres from "express";
import connect from "./config/db.js";
const app = expres();

connect();

app.use(expres.json());
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
