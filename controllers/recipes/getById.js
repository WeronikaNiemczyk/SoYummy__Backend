// controllers/recipes/getById.js

const fetchRecipe = require("../../services/recipes.service");
const Ingredients = require("../../models/ingredients.model");
const Recipes = require("../../models/recipe.model");

const getRecipeById = async (req, res) => {
  try {
    const recipe = await fetchRecipe(req.params.id);
    if (recipe) {
      res.json(recipe);
    } else {
      res
        .status(404)
        .json({ message: `No recipe found for id ${req.params.id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching recipe" });
  }
};

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

module.exports = { getRecipeById, getRecipeByIngredients };
