// controllers/auth.controller.js

const login = require("./auth/login");
const logout = require("./auth/logout");
const signup = require("./auth/signup");
const updateAvatar = require("./auth/updateAvatar");
const resendVerificationEmail = require("./auth/resendVerificationEmail");
const verifyEmail = require("./auth/verifyEmail");
const getCurrentUser = require("./auth/getCurrentUser");
const updateSubscription = require("./auth/updateSubscription");

const sendEmail = require("./auth/sendEmail");
const updateName = require("./auth/updateName");
const updateMail = require("./auth/updateMail");
const updatePassword = require("./auth/updatePassword");
const removeUser = require("./auth/removeUser");
const updateUser = require("./auth/updateUser");
const sendNewsletterEmail = require("./auth/sendNewsletterEmail");

module.exports = {
  login,
  logout,
  signup,
  updateAvatar,
  resendVerificationEmail,
  verifyEmail,
  getCurrentUser,
  sendEmail,
  updateName,
  updateMail,
  updatePassword,
  removeUser,
  updateUser,
  sendNewsletterEmail,
  updateSubscription,
};
