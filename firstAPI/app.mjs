import express from "express";
import accountsRouter from "./routes/accounts.routes.js";
import { promises as fs } from "fs";
import winston from "winston";
import cors from "cors";
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import accountsServices from "./services/accounts.services.js";
import Schema from "./schema/index.js";

const { readFile, writeFile } = fs;

global.fileName = "accounts.json";
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "my-bank-api.log" }),
  ],
  format: combine(label({ label: "my-bank-api" }), timestamp(), myFormat),
});

// const schema = buildSchema(`

// type Account{
//   id:Int
//   name: String
//   balance: Float
// }

// input AccountInput{
//   id:Int
//   name: String
//   balance: Float
// }
// type Query{
//   getAccounts:[Account]
//   getAccount(id: Int):Account
// }

// type Mutation{
//   createAccount(account: AccountInput): Account
//   deleteAccount(id:Int): Boolean
//   updateAccount(account: AccountInput): Account
// } `);

// const root = {
//   getAccounts: () => accountsServices.getAccounts(),
//   getAccount(args) {
//     return accountsServices.getAccount(args.id);
//   },
//   createAccount({ account }) {
//     return accountsServices.createAccount(account);
//   },
//   deleteAccount(args) {
//     accountsServices.deleteAccount(args.id);
//   },
//   updateAccount({ account }) {
//     return accountsServices.updateAccount(account);
//   },
// };

const app = express();
app.use(express.json());
app.use(cors()); //cors liberado
app.use(express.static("public"));
app.use("/account", accountsRouter);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    //rootValue: root,
    graphiql: true,
  })
);

app.listen(3000, async () => {
  try {
    await readFile(fileName);
    logger.info("API Started");
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile(fileName, JSON.stringify(initialJson))
      .then(() => logger.info("API Started and File Created"))
      .catch((err) => logger.error(err));
  }
  logger.info("Server in port 3000");
});
