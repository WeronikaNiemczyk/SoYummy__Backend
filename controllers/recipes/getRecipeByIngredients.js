// controllers/recipes/getRecipeByIngredients.js

const Ingredients = require("../../models/ingredients.model");
const Recipes = require("../../models/recipe.model");

const getRecipeByIngredients = async (req, res) => {
  try {
    const ingredientName = req.query.name;

    if (!ingredientName) {
      return res.status(400).json({ message: "Ingredient name is required" });
    }
    const ingredient = await Ingredients.findOne({ ttl: ingredientName });

    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    const ingredientId = ingredient._id;

    const recipes = await Recipes.find({
      "ingredients.id": ingredientId,
    });

    if (recipes.length === 0) {
      return res
        .status(404)
        .json({ message: "No recipes found with the specified ingredient" });
    }

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getRecipeByIngredients;
