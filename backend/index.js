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
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Enable CORS
pp.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === FRONTEND_URL) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle Preflight Requests
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

// db
dbConnect()
  .then(() => console.log("✅ Database connected!"))
  .catch((err) => console.error("❌ Database connection error:", err));

// app route
app.use("/api/auth", AuthRoute);
app.use("/api/message", MessageRoute);
app.use("/api/user", UserRoute);

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
  console.log(`🚀 Server listening on port ${port}`);
});
