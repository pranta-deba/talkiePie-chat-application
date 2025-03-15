import express from "express";
const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
