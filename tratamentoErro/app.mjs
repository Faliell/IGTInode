import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  throw new Error("Mensagem de erro teste");
});

app.post("/", async (req, res, next) => {
  try {
    throw new Error("Mensagem de erro teste");
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log("Erro 1");
  res.status(599).send("Ocorreu um erro, tente mais tarde");
});

app.listen(3000, () => {
  console.log("Server port 3000");
});
