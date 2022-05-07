import express from "express";
import { promises as fs } from "fs";
import cors from "cors";

const { readFile, writeFile } = fs;

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    if (account.balance == null || !account.name) {
      throw new Error("Name e balance são obrigatórios");
    }

    const data = JSON.parse(await readFile(global.fileName));

    account = {
      id: data.nextId++,
      name: account.name,
      balance: account.balance,
    };

    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(account);

    logger.info(`POST / Account ${JSON.stringify(account)}`);
  } catch (err) {
    console.log("errro");
    res.status(400).send({ error: err.message }); //funciona
    next(err); // não funciona
  }
});

router.get("/", cors(), async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    res.send(data);
    logger.info(`GET / Account `);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const account = data.accounts.find(
      (account) => account.id == req.params.id
    );
    res.send(account);
    logger.info(`GET / Account/:id `);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.accounts = data.accounts.filter(
      (account) => account.id !== parseInt(req.params.id)
    );
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.end();
    logger.info(`Delete / account/:id - ${req.params.id} `);
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const account = req.body;

    if (account.balance == null || !account.name) {
      throw new Error("Name e balance são obrigatórios");
    }

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex((a) => a.id === account.id);

    if (index === -1) {
      throw new Error("Registro não encontrado");
    }

    data.accounts[index].name = account.name;
    data.accounts[index].balance = account.balance;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(account);
    logger.info(`PUT / Account ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
});

router.patch("/updateBalance", async (req, res, next) => {
  try {
    const account = req.body;

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex((a) => a.id === account.id);

    if (account.balance == null || !account.id) {
      throw new Error("Name e balance são obrigatórios");
    }

    if (index === -1) {
      throw new Error("Registro não encontrado");
    }

    data.accounts[index].balance = account.balance;

    await writeFile(global.fileName, JSON.stringify(data));
    res.send(data.accounts[index]);
    logger.info(
      `PATCH / account/updateBalance ${JSON.stringify(account, null, 2)}`
    );
  } catch (err) {
    next(err);
  }
});
//não funciona
router.use((err, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
  console.log("qqqqqqq");
  res.status(400).send({ error: err.message });
});

export default router;
