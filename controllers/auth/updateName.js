// controllers/auth/updateName.js

const User = require("../../models/user.model");
const { updateNameSchema } = require("../../validations/validation");

const updateName = async (req, res) => {
  const { error } = updateNameSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name: req.body.name },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to update name" });
  }
};

module.exports = updateName;
