import express from "express";

const app = express();
app.use(express.json());

app.all("/testAll", (req, res) => {
  res.send(req.method);
});

//caracteres especiais

app.get("/teste?", (req, res) => {
  res.send("teste???");
});

app.get("/buzz+", (_, res) => {
  res.send("buzzzz++++");
});

app.get("/one*two", (req, res) => {
  res.send(req.path);
});

app.post("/one(ing)?", (req, res) => {
  console.log(req.body);
  res.send(req.path);
});

app.get("/.*red$", (req, res) => {
  res.send("expressão regular");
});

//parametros na rota
app.post("/testeparams/:id/:a?", (req, res) => {
  res.send(req.params.id + " " + req.params.a);
});

//parametros via query

app.get("/testQuery", (req, res) => {
  res.send(req.query);
});

//next

app.get(
  "/testnext",
  (req, res, next) => {
    console.log("callback1");
    next();
  },
  (req, res) => {
    console.log("callback2");
    res.end();
  }
);

//next com array

function callback1(req, res, next) {
  console.log("callback1");
  next();
}

function callback2(req, res, next) {
  console.log("callback2");
  next();
}

function callback3(req, res, next) {
  console.log("callback3");
  res.end();
}

app.get("/testenextarray", [callback1, callback2, callback3]);

// Route

app
  .route("/testRoute")
  .get((req, res) => {
    res.send(req.method);
  })
  .post((req, res) => {
    res.send(req.method);
  })
  .delete((req, res) => {
    res.send(req.method);
  });

app.listen(3000, () => {
  console.log("Server in port 3000");
});
