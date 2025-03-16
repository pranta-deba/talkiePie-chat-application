import express from "express";
import { sentMessage } from "../Controllers/message.controller.js";
const router = express.Router();

router.post("/send/:id", sentMessage);

export const MessageRoute = router;
