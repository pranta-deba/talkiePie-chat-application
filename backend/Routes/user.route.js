import express from "express";
import isLogged from "../Middlewares/isLogged.js";
import { getCurrentChatters, getUserBySearch } from "../Controllers/user.controller.js";
const router = express.Router();

router.get("/search", isLogged, getUserBySearch);
router.get("/current-chatters", isLogged, getCurrentChatters);

export const UserRoute = router;
