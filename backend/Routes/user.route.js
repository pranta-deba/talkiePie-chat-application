import express from "express";
import isLogged from "../Middlewares/isLogged.js";
import {
  getCurrentChatters,
  getUserById,
  getUserBySearch,
  updatedUser,
} from "../Controllers/user.controller.js";
const router = express.Router();

router.get("/search", isLogged, getUserBySearch);
router.get("/current-chatters", isLogged, getCurrentChatters);
router.get("/:id", isLogged, getUserById);
router.put("/update", isLogged, updatedUser);

export const UserRoute = router;
