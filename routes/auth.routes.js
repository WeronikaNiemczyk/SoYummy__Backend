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

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related endpoints
 */

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Log in user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Invalid input
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/v1/users/logout:
 *   get:
 *     summary: Log out user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful logout
 *       401:
 *         description: Unauthorized
 */
router.get("/logout", auth, authController.logout);

/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/signup", authController.signup);

/**
 * @swagger
 * /api/v1/users/current:
 *   get:
 *     summary: Get current user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *       401:
 *         description: Unauthorized
 */
router.get("/current", auth, authController.getCurrentUser);

/**
 * @swagger
 * /api/v1/users/subscription:
 *   patch:
 *     summary: Update user subscription
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully updated subscription
 *       401:
 *         description: Unauthorized
 */
router.patch("/subscription", auth, authController.updateSubscription);

/**
 * @swagger
 * /api/v1/users/avatars:
 *   patch:
 *     summary: Update user avatar
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successfully updated avatar
 *       401:
 *         description: Unauthorized
 */
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  authController.updateAvatar
);

/**
 * @swagger
 * /api/v1/users/verify/{verificationToken}:
 *   get:
 *     summary: Verify user email
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: verificationToken
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully verified email
 *       400:
 *         description: Invalid verification token
 */
router.get("/verify/:verificationToken", verifyEmail);

/**
 * @swagger
 * /api/v1/users/verify:
 *   post:
 *     summary: Resend verification email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verification email resent
 *       400:
 *         description: Invalid input
 */
router.post("/verify", resendVerificationEmail);

/**
 * @swagger
 * /api/v1/users/send-email:
 *   post:
 *     summary: Send an email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *               subject:
 *                 type: string
 *               header1:
 *                 type: string
 *               header2:
 *                 type: string
 *               header3:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       500:
 *         description: Failed to send email
 */
router.post("/send-email", auth, validate(sendEmailSchema), sendEmail);

/**
 * @swagger
 * /api/v1/users/update-name:
 *   patch:
 *     summary: Update user's name
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated name
 *       400:
 *         description: Invalid input
 */
router.patch("/update-name", auth, validate(updateNameSchema), updateName);

/**
 * @swagger
 * /api/v1/users/update-mail:
 *   patch:
 *     summary: Update user's email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated email
 *       400:
 *         description: Invalid input
 */
router.patch("/update-mail", auth, validate(updateMailSchema), updateMail);

/**
 * @swagger
 * /api/v1/users/update-password:
 *   patch:
 *     summary: Update user's password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated password
 *       400:
 *         description: Invalid input
 */
router.patch(
  "/update-password",
  auth,
  validate(updatePasswordSchema),
  updatePassword
);

/**
 * @swagger
 * /api/v1/users/remove-user:
 *   delete:
 *     summary: Remove user account
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully removed user
 *       401:
 *         description: Unauthorized
 */
router.delete("/remove-user", auth, removeUser);

/**
 * @swagger
 * /api/v1/users/send-newsletter:
 *   post:
 *     summary: Send newsletter email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *               subject:
 *                 type: string
 *               header1:
 *                 type: string
 *               header2:
 *                 type: string
 *               header3:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Newsletter sent successfully
 *       500:
 *         description: Failed to send newsletter
 */
router.post(
  "/send-newsletter",
  auth,
  validate(sendNewsletterEmailSchema),
  sendNewsletterEmail
);

module.exports = router;
