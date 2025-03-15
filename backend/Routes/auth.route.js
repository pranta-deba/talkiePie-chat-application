import express from "express";
import {
  loginUserIntoDB,
  userRegisterIntoDB,
} from "../Controllers/auth.controller.js";
const router = express.Router();

router.post("/register", userRegisterIntoDB);
router.post("/login", loginUserIntoDB);

export const AuthRoute = router;
