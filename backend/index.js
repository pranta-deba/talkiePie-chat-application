import express from "express";
import dotenv from "dotenv";
import dbConnect from "./DB/dbConnect.js";
import { AuthRoute } from "./Routes/auth.route.js";
import { MessageRoute } from "./Routes/message.route.js";
import cookieParser from "cookie-parser";
import { UserRoute } from "./Routes/user.route.js";
import { app } from "./Socket/socket.js";


dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// app route
app.use("/api/auth", AuthRoute);
app.use("/api/message", MessageRoute);
app.use("/api/user", UserRoute);

// root route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  dbConnect();
  console.log(`listening on port ${port}`);
});
