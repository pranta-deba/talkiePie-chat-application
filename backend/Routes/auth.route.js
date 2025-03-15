import express from "express";
import {
  loginUserIntoDB,
  logOut,
  userRegisterIntoDB,
} from "../Controllers/auth.controller.js";
const router = express.Router();

router.post("/register", userRegisterIntoDB);
router.post("/login", loginUserIntoDB);
router.post("/logout", logOut);

export const AuthRoute = router;
