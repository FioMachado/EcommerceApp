const User = require("./../User");
const resolvers = {
  Query: {
    userDetail: async (args, ctx) => User.userDetail(args, ctx),
  },
  Mutation: {
    userSignUp: async (args, ctx) => User.userSignUp(args, ctx),
    userSingIn: async (args, ctx) => User.userSingIn(args, ctx),
  },
};
module.exports = resolvers;
