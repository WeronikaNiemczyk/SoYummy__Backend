// controllers/shoppingList/addProductToShoppingList.js

const User = require("../../models/user.model");
const Ingredient = require("../../models/ingredients.model");

const addProductToShoppingList = async (req, res) => {
  try {
    const userId = req.user._id;
    const { ingredientId, measure } = req.body;

    const ingredient = await Ingredient.findById(ingredientId);
    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    const user = await User.findById(userId);
    const existingIngredient = user.shoppingList.find((item) =>
      item.ingredientId.equals(ingredientId)
    );

    if (existingIngredient) {
      existingIngredient.quantity += parseInt(measure);
    } else {
      user.shoppingList.push({
        ingredientId: ingredient._id,
        name: ingredient.ttl,
        quantity: parseInt(measure),
        unit: measure.match(/[a-zA-Z]+/)[0],
      });
    }

    await user.save();
    res.status(200).json({
      message: "Ingredient added to shopping list",
      shoppingList: user.shoppingList,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = addProductToShoppingList;
