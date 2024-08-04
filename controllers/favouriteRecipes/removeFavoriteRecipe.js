// controllers/favouriteRecipes/removeFavoriteRecipe.js

const User = require("../../models/user.model");
const Recipe = require("../../models/recipe.model");

const removeFavoriteRecipe = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const recipeId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    user.favorites = user.favorites.filter((id) => id !== null);

    user.favorites = user.favorites.filter((id) => {
      return id.toString() !== recipeId;
    });
    await user.save();

    res
      .status(200)
      .json({ message: `Recipe ${recipe.title} removed from favorites` });
  } catch (error) {
    next(error);
  }
};

module.exports = removeFavoriteRecipe;
