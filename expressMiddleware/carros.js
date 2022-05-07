import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("get carros");
  res.send("get carros");
});

router.get("/precos", (req, res) => {
  console.log("get carros/preços");
  res.send("get carros/preços");
});

export default router;
