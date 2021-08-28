import jwt from "jsonwebtoken";

const generateauth = (id) => {
  return jwt.sign({ id }, "HIBRO", {
    expiresIn: "30d",
  });
};
export default generateauth;
