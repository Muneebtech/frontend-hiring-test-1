const httpStatus = require("http-status");
const tokenService = require("./token.service");
const userService = require("./user.service");
const Token = require("../models/token.model");
const ApiError = require("../utils/ApiError");
const { tokenTypes } = require("../config/tokens");
const  User  = require("../models/user");
const _ = require("lodash");
/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (user.password !== password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  } else {
    return user;
  }
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (data) => {
  let check = data.latest;
  let refreshToken = data.refreshToken;
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  const userId = refreshTokenDoc.user;
  const isActive = await User.findOne({ _id: userId });
  if (check == "true") {
    if (isActive) {
      await User.updateOne(
        { _id: userId },
        {
          $set: {
            active: false,
          },
        }
      );
    }
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );
    // if(refreshTokenDoc.length)
    if (!_.isEmpty(refreshTokenDoc)) {
      const user = await userService.getUserById(refreshTokenDoc.user);
      if (!user) {
        throw new Error();
      }
      await refreshTokenDoc.remove();
      return tokenService.generateAuthTokens(user);
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, "No token found");
    }
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};


const removeExpiredToken = async () => {
  const tokens = await Token.find({}, { id: 1, expires: 1, email: 1 });
  let tokensTobeDeleted = [];
  let emailsList = [];
  let currentTime = new Date();
  tokens.forEach((token) => {
    let difference = currentTime > token.expires;
    if (difference == true) {
      tokensTobeDeleted.push(token.id);
      emailsList.push(token.email);
    }
  });
  if (tokensTobeDeleted.length != 0) {
    await Token.deleteMany({ _id: { $in: tokensTobeDeleted } });
  }
  if (emailsList.length != 0) {
    for (i = 0; i < emailsList.length; i++) {
      await User.updateOne(
        { email: emailsList[i] },
        { $set: { active: "false" } }
      );
    }
  }
};
module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
};
