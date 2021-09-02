import jwt from "jsonwebtoken";

const generateauth = (id) => {
  return jwt.sign({ id }, "COOLFEES", {
    expiresIn: "30d",
  });
};
export default generateauth;
