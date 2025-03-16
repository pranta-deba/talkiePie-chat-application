import express from "express";
import { getMessages, sentMessage } from "../Controllers/message.controller.js";
import isLogged from "../Middlewares/isLogged.js";
const router = express.Router();

router.post("/send/:id", isLogged, sentMessage);
router.get("/:id", isLogged, getMessages);

export const MessageRoute = router;
