// controllers/recipes/getPopularRecipes.js

const Recipes = require("../../models/recipe.model");

const getPopularRecipes = async (req, res, next) => {
  try {
    const popularRecipes = await Recipes.find({})
      .sort({ favoritesCount: -1 })
      .limit(10);

    res.status(200).json(popularRecipes);
  } catch (error) {
    next(error);
  }
};

module.exports = getPopularRecipes;
