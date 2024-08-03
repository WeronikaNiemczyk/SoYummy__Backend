// controllers/recipes/getOwnRecipes.js

const Recipes = require("../../models/recipe.model");

const getOwnRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find({ owner: req.user.id });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetchnig recipes" });
  }
};

module.exports = getOwnRecipes;
