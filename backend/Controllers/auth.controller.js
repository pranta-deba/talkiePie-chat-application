import { User } from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/jwtToken.js";

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
      await newUser.save();
      createToken(newUser._id, res);
    } else {
      res.status(400).send({ success: false, message: "Invalid User Data" });
    }

    res.status(200).send({
      success: true,
      message: "User registered successfully.",
      data: {
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
        gender: newUser.gender,
        profileImage: newUser.profileImage,
      },
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "something want wrong!", error });
  }
};

export const loginUserIntoDB = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    const isMatch = bcrypt.compareSync(password, user.password || "");
    if (!isMatch) {
      return res
        .status(400)
        .send({ success: false, message: "Wrong password" });
    }
    createToken(user._id, res);
    res.status(200).send({
      success: true,
      message: "User logged successfully.",
      data: {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        gender: user.gender,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "something want wrong!", error });
  }
};

export const logOut = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).send({ success: true, message: "Logout successfully." });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "something want wrong!", error });
  }
};
