import { GraphQLList, GraphQLInt } from "graphql";
import Account from "../types/Account.js";
import accountResolver from "../resolvers/account.resolver.js";

const accountQueries = {
  getAccounts: {
    type: new GraphQLList(Account),
    resolve: () => accountResolver.getAccounts(),
  },

  getAccount: {
    type: Account,
    args: {
      id: {
        name: "id",
        type: GraphQLInt,
      },
    },
    resolve: (_, args) => accountResolver.getAccount(args.id),
  },
};

export default accountQueries;
