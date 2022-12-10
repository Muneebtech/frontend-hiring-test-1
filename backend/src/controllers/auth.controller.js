const httpStatus = require("http-status");
// const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const { userService, tokenService, authService } = require("../services");

const register = async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  let tokens;
  tokens = await tokenService.generateAuthTokens(user);
  res.send({ user: user, tokens });
};

const logout = async (req, res) => {
  await authService.logout(req.body);
  res.status(httpStatus.NO_CONTENT).send();
};

const refreshTokens = async (req, res) => {
  const { refreshToken } = req.body;
  const tokens = await authService.refreshAuth(refreshToken);
  res.send({ ...tokens });
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
};
