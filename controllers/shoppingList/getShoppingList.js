// controllers/shoppingList/getShoppingList.js

const User = require("../../models/user.model");

const getShoppingList = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    res.status(200).json({ shoppingList: user.shoppingList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getShoppingList;
