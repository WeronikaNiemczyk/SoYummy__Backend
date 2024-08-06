// controllers/favouriteRecipes/addFavoriteRecipe.js

const User = require("../../models/user.model");
const Recipe = require("../../models/recipe.model");

const addFavoriteRecipe = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const recipeId = req.body.recipeId;

    const user = await User.findById(userId);
   
    if (!user.favorites.includes(recipeId)) {
      user.favorites.push(recipeId);
      await user.save();
    }

    const recipe = await Recipe.findById(recipeId);
    if (recipe) {
      recipe.favoritesCount += 1;
      await recipe.save();
    }
    console.log("recipe.favoritesCount", recipe.favoritesCount);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res
      .status(200)
      .json({ message: `Recipe '${recipe.title}' added to favorites` });
  } catch (error) {
    next(error);
  }
};

module.exports = addFavoriteRecipe;
