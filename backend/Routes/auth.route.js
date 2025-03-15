import express from "express";
import { userRegisterIntoDB } from "../Controllers/auth.controller.js";
const router = express.Router();

router.post("/register", userRegisterIntoDB);

export const AuthRoute = router;
