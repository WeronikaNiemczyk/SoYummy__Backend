// routes/auth.routes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const verifyEmail = require("../controllers/auth/verifyEmail");
const resendVerificationEmail = require("../controllers/auth/resendVerificationEmail");

// Nowe kontrolery
const sendEmail = require("../controllers/auth/sendEmail");
const updateName = require("../controllers/auth/updateName");
const updateMail = require("../controllers/auth/updateMail");
const updatePassword = require("../controllers/auth/updatePassword");
const removeUser = require("../controllers/auth/removeUser");
const sendNewsletterEmail = require("../controllers/auth/sendNewsletterEmail");

// Walidacje
const validate = require("../middlewares/validate");
const {
  updateNameSchema,
  updateMailSchema,
  updatePasswordSchema,
  sendEmailSchema,
  sendNewsletterEmailSchema,
} = require("../validations/validation");

router.post("/login", authController.login);
router.get("/logout", auth, authController.logout);
router.post("/signup", authController.signup);
router.get("/current", auth, authController.getCurrentUser);
router.patch("/subscription", auth, authController.updateSubscription);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  authController.updateAvatar
);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", resendVerificationEmail);

// Nowe ścieżki
router.post("/send-email", auth, validate(sendEmailSchema), sendEmail);
router.patch("/update-name", auth, validate(updateNameSchema), updateName);
router.patch("/update-mail", auth, validate(updateMailSchema), updateMail);
router.patch(
  "/update-password",
  auth,
  validate(updatePasswordSchema),
  updatePassword
);
router.delete("/remove-user", auth, removeUser);
router.post(
  "/send-newsletter",
  auth,
  validate(sendNewsletterEmailSchema),
  sendNewsletterEmail
);

module.exports = router;
