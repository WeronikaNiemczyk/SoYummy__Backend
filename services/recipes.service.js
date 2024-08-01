// services/recipes.service.js

const Recipes = require("../models/recipe.model");

const fetchRecipe = (id) => {
  return Recipes.findOne({
    _id: id,
  });
};

module.exports = fetchRecipe;
