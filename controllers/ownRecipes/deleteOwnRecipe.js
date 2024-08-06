// controllers/recipes/deleteOwnRecipe.js

const Recipes = require("../../models/recipe.model");

const deleteOwnRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe removed" });
  } catch (error) {
    res.status(500).json({ message: "Error removing recipe" });
  }
};

module.exports = deleteOwnRecipe;
