// controllers/auth.controller.js

const login = require("./auth/login");
const logout = require("./auth/logout");
const signup = require("./auth/signup");
const updateAvatar = require("./auth/updateAvatar");
const resendVerificationEmail = require("./auth/resendVerificationEmail");
const verifyEmail = require("./auth/verifyEmail");

module.exports = {
  login,
  logout,
  signup,
  updateAvatar,
  resendVerificationEmail,
  verifyEmail,
};
