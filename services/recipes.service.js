// services/recipes.service.js

const Recipes = require("../models/recipe.model");
const Ingredients = require("../models/ingredients.model");

const fetchRecipe = (id) => {
  return Recipes.findOne({
    _id: id,
  });
};

const fetchIngredients = () => {
  return Ingredients.find({});
};

module.exports = { fetchRecipe, fetchIngredients };
