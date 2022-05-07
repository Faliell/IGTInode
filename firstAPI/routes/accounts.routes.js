import express from "express";
import cors from "cors";
import accountsController from "../controllers/accounts.controller.js";

const router = express.Router();

router.post("/", accountsController.createAccount);
//cors para uma rota
router.get("/", cors(), accountsController.getAccounts);

router.get("/:id", accountsController.getAccount);

router.delete("/:id", accountsController.deleteAccount);

router.put("/", accountsController.updateAccount);

router.patch("/updateBalance", accountsController.updateBalance);

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  console.log(err);
  res.status(400).send({ error: err.message });
});

export default router;
