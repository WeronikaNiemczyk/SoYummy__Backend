// controllers/shoppingList/removeProductFromShoppingList.js

const User = require("../../models/user.model");

const removeProductFromShoppingList = async (req, res) => {
  try {
    const userId = req.user._id;
    const { ingredientId } = req.body;

    const user = await User.findById(userId);
    user.shoppingList = user.shoppingList.filter(
      (item) => !item.ingredientId.equals(ingredientId)
    );

    await user.save();
    res.status(200).json({
      message: "Ingredient removed from shopping list",
      shoppingList: user.shoppingList,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = removeProductFromShoppingList;
