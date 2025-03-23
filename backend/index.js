import express from "express";
import dotenv from "dotenv";
import dbConnect from "./DB/dbConnect.js";
import { AuthRoute } from "./Routes/auth.route.js";
import { MessageRoute } from "./Routes/message.route.js";
import cookieParser from "cookie-parser";
import { UserRoute } from "./Routes/user.route.js";
import { app, server } from "./Socket/socket.js";
import cors from "cors";
import errorHandler from "./Errors/errorHandler.js";
import { rootPage } from "./utils/rootRouteContent.js";

dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
// Enable CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
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
  res.send(rootPage);
});

// Handle 404 errors
app.use((req, res, next) => {
  const error = new Error("Route not found!");
  error.status = 404;
  next(error);
});

// Global Error Handling Middleware
app.use(errorHandler);

server.listen(port, () => {
  dbConnect();
  // console.log(`listening on port ${port}`);
});
