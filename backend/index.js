import express from "express";
import dotenv from "dotenv";
import dbConnect from "./DB/dbConnect.js";
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  dbConnect();
  console.log(`listening on port ${port}`);
});
