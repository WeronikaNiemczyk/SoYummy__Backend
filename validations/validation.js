// validations/validation.js

const Joi = require("joi");

const nameValidation = Joi.string().min(6).max(64).required();
const emailValidation = Joi.string().email().min(6).max(64).required();
const passwordValidation = Joi.string()
  .min(8)
  .max(128)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
  .required();

const signupSchema = Joi.object({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
});

const loginSchema = Joi.object({
  email: emailValidation,
  password: passwordValidation,
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "master cook").required(),
});

const resendEmailSchema = Joi.object({
  email: emailValidation,
});

module.exports = {
  signupSchema,
  loginSchema,
  subscriptionSchema,
  resendEmailSchema,
};
