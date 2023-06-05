const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type AuthPayload {
    msg: String
    token: String
    user: user
  }
  type user {
    fName: String
    lName: String
    mobile: String
    email: String
    message: String
  }

  type Query {
    userDetail: user
  }

  type Mutation {
    userSignUp(
      firstName: String
      lastName: String
      mobile: String
      email: String!
      password: String!
    ): String
    userSingIn(email: String!, password: String!): AuthPayload
  }
`;

module.exports = typeDefs;
