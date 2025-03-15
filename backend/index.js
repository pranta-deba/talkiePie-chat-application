import express from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
