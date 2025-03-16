import express from "express";
import isLogged from "../Middlewares/isLogged.js";
import { getUserBySearch } from "../Controllers/user.controller.js";
const router = express.Router();

router.get("/search", isLogged, getUserBySearch);

export const UserRoute = router;
