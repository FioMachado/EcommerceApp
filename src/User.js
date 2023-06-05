const { UserInputError, ApolloError } = require("apollo-server-express");
const bcrypt = require("bcrypt");
const userMsg = require("../common/userMsg.json");
const Constant = require("../constant/constant");
const jwt = require("jsonwebtoken");
const UserModel = require("./../models/users.mode");

const userSignUp = async (
  obj,
  { firstName, lastName, mobile, email, password },
  ctx
) => {
  const user = await UserModel.findOne({
    email,
  });

  if (user) {
    throw new ApolloError(userMsg.userAlreadyExist, Constant.ALREADY_EXISTS);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  password = hashPassword;

  await UserModel.create({
    firstName,
    lastName,
    email,
    mobile,
    password,
  });

  return userMsg.succSignUp;
};
const userSingIn = async (obj, { email, password }, ctx, info) => {
  const user = await UserModel.findOne({
    email,
  });

  if (!user || user === null) {
    throw new ApolloError(userMsg.userNotExist, Constant.NOT_FOUND);
  }

  const matchPass = await bcrypt.compare(password, user.password);
  if (!matchPass) throw new UserInputError(userMsg.errPassWrong);

  const tokenData = {
    id: user.id,
    role: Constant.User,
  };

  const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: Constant.expiresIn,
  });

  return {
    msg: userMsg.succSignIn,
    token: token,
    user: user,
  };
};
module.exports = { userSingIn, userSignUp };
