// controllers/favouriteRecipes/addFavoriteRecipe.js

const User = require("../../models/user.model");
const Recipe = require("../../models/recipe.model");

const addFavoriteRecipe = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // console.log("userId", userId);
    const recipeId = req.body.recipeId;
    // console.log("recipeId", recipeId);

    const user = await User.findById(userId);
    // console.log("user", user);
    if (!user.favorites.includes(recipeId)) {
      user.favorites.push(recipeId);
      await user.save();
    }
    // console.log("user save", user);

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    // console.log("recipe", recipe);

    res
      .status(200)
      .json({ message: `Recipe '${recipe.title}' added to favorites` });
  } catch (error) {
    next(error);
  }
};

module.exports = addFavoriteRecipe;
