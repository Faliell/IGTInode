import express from "express";
import router from "./carros.js";

const app = express();
app.use(express.json());

app.use("/carros", router);

app.use((req, res, next) => {
  console.log(new Date());
  next();
});

app.get("/", (req, res) => {
  res.send("dadada");
});

app.listen(3000, (req, res) => console.log("Server port 3000"));
