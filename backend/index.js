import express from "express";
import dotenv from "dotenv";
import dbConnect from "./DB/dbConnect.js";
import { AuthRoute } from "./Routes/auth.route.js";
import { MessageRoute } from "./Routes/message.route.js";
import cookieParser from "cookie-parser";
import { UserRoute } from "./Routes/user.route.js";
import { app, server } from "./Socket/socket.js";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// app route
app.use("/api/auth", AuthRoute);
app.use("/api/message", MessageRoute);
app.use("/api/user", UserRoute);

// root route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

server.listen(port, () => {
  dbConnect();
  // console.log(`listening on port ${port}`);
});
