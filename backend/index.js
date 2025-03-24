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
import path from "path";

const __dirname = path.resolve();

dotenv.config();

const port = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "https://talkie-pie-chats.onrender.com";

// Enable CORS
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Handle Preflight Requests
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

// app route
app.use("/api/auth", AuthRoute);
app.use("/api/message", MessageRoute);
app.use("/api/user", UserRoute);

// Serve static files from the frontend folder (after build)
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// root route
app.get("/", (req, res) => res.send(rootPage));

// Handle 404 errors
app.use((req, res, next) => {
  const error = new Error("Route not found!");
  error.status = 404;
  next(error);
});

// Global Error Handling Middleware
app.use(errorHandler);

server.listen(port, () => {
  // db
  dbConnect();
  console.log(`🚀 Server listening on port ${port}`);
});
