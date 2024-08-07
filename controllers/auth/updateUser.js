// controllers/auth/updateUser.js

const User = require("../../models/user.model");

const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.status(200).json({ status: "success", code: 200, data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateUser;
