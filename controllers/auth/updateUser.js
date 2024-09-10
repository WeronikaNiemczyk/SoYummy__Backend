// controllers/auth/updateUser.js

const User = require("../../models/user.model");

// const updateUser = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
//       new: true,
//     });
//     res.status(200).json({ status: "success", code: 200, data: updatedUser });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const { updateUserSchema } = require("../../validations/validation");

const updateUser = async (req, res) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

module.exports = updateUser;
