// This middleware validates the token
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    User.findById(decoded.id)
      .select("-password")
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        console.error(err);
        res.status(401);
        throw new Error("Not Authorized - Token Failed");
      });
  } else {
    res.status(401);
    throw new Error("Not Authorized - No Token");
  }
};

export { protect };
