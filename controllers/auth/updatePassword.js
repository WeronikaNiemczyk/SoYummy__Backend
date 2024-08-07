// controllers/auth/updatePassword.js

const User = require("../../models/user.model");
const { updatePasswordSchema } = require("../../validations/validation");
const bcrypt = require("bcryptjs");

const updatePassword = async (req, res) => {
  const { error } = updatePasswordSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { password: hashedPassword },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to update password" });
  }
};

module.exports = updatePassword;
