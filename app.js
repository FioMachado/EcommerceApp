const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();
const express = require("express");
const auth = require("./common/Auth");
const app = express();
const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers");
const connectDB = require("./database");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 4001;
const mainServer = async () => {
  await connectDB();
  const server = new ApolloServer({
    debug: true,
    typeDefs,
    resolvers,

    context: async ({ req }) => {
      const tokenWithBearer = req.headers.authorization || "";
      const token = tokenWithBearer.split(" ")[1];

      const user = await auth.getUser(token);
      return { user };
    },
  });
  await server.start();
  server.applyMiddleware({ app });
};
mainServer();
app.listen({ port: port }, () => {
  console.log(`server start at http://localhost:${port}/graphql`);
});
