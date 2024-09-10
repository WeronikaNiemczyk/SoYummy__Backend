// controllers/auth/signup.js

const User = require("../../models/user.model");
const { signupSchema } = require("../../validations/validation");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const emailService = require("../../services/email.service");

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  const { error } = signupSchema.validate({ name, email, password });
  if (error) {
    return res.status(400).json({
      status: "validation-error",
      code: 400,
      data: {
        message: error.details[0].message,
      },
    });
  }

  const user = await User.findOne({ email }).lean();
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    const avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);
    const verificationToken = uuidv4();
    const newUser = new User({ name, email, avatarURL, verificationToken });
    newUser.setPassword(password);
    await newUser.save();

    const verificationLink = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/verify/${verificationToken}`;
    await emailService.sendVerificationEmail(email, verificationLink);

    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message:
          "Registration successful. Please check your email to verify your account.",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
