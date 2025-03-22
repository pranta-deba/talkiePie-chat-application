import jwt from "jsonwebtoken";
import { User } from "../Models/user.model.js";

const isLogged = async (req, res, next) => {
  try {
    const token = req?.cookies?.jwt;
    if (!token) {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
    const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    if (!decode) {
      return res.status(403).send({ success: false, message: "Forbidden" });
    }
    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res
      .status(403)
      .send({ success: false, message: "Something want wrong!", error });
  }
};

export default isLogged;
