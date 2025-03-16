import express from "express";
import { sentMessage } from "../Controllers/message.controller.js";
import isLogged from "../Middlewares/isLogged.js";
const router = express.Router();

router.post("/send/:id", isLogged, sentMessage);

export const MessageRoute = router;
