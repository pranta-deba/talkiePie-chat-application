import { User } from "../Models/user.model.js";
import bcrypt from "bcryptjs";

export const userRegisterIntoDB = async (req, res) => {
  try {
    const isExistUser = await User.findOne({
      username: req.body.username,
      email: req.body.email,
    });
    if (isExistUser) {
      return res.status(400).send({
        success: false,
        message: "User name and email already exists.",
      });
    }

    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const profileGirl =
      req.body.profileImage ||
      `https://avatar.iran.liara.run/public/girl?username=${req.body.username}`;
    const profileBoy =
      req.body.profileImage ||
      `https://avatar.iran.liara.run/public/boy?username=${req.body.username}`;

    const newUser = new User({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      gender: req.body.gender,
      password: hashPassword,
      profileImage: req.body.gender === "male" ? profileBoy : profileGirl,
    });
    
    if (newUser) {
      const savedUser = await newUser.save();
      res.send({ success: true, message: "User registered successfully." });
    } else {
      res
        .status(400)
        .send({ success: false, message: "Failed to register user." });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Server Error." });
  }
};
