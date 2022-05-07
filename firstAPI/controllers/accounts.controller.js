import accountService from "../services/accounts.services.js";

async function createAccount(req, res, next) {
  try {
    let account = req.body;
    if (account.balance == null || !account.name) {
      throw new Error("Name e balance são obrigatórios");
    }
    account = await accountService.createAccount(account);
    res.send(account);
    logger.info(`POST / Account ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
}

async function getAccounts(req, res, next) {
  try {
    res.send(await accountService.getAccounts());
    logger.info(`GET / Account `);
  } catch (err) {
    next(err);
  }
}

async function getAccount(req, res, next) {
  try {
    res.send(await accountService.getAccount(req.params.id));
    logger.info(`GET / Account/:id `);
  } catch (err) {
    next(err);
  }
}

async function deleteAccount(req, res, next) {
  try {
    await accountService.deleteAccount(req.params.id);
    res.send(`Delete / account/:id - ${req.params.id} `);
    logger.info(`Delete / account/:id - ${req.params.id} `);
  } catch (err) {
    next(err);
  }
}

async function updateAccount(req, res, next) {
  try {
    const account = req.body;

    if (account.balance == null || !account.name) {
      throw new Error("Name e balance são obrigatórios");
    }
    res.send(await accountService.updateAccount(account));
    logger.info(`PUT / Account ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
}

async function updateBalance(req, res, next) {
  try {
    const account = req.body;

    if (account.balance == null || !account.id) {
      throw new Error("Name e balance são obrigatórios");
    }

    res.send(await accountService.updateBalance(account));
    logger.info(
      `PATCH / account/updateBalance ${JSON.stringify(account, null, 2)}`
    );
  } catch (err) {
    next(err);
  }
}

export default {
  createAccount,
  getAccounts,
  getAccount,
  deleteAccount,
  updateAccount,
  updateBalance,
};
