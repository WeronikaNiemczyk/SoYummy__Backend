// controllers/recipe.controller.js

const getCategory = require("./recipes/getCategory");
const getIngredientsList = require("./recipes/getIngredientsList");
const getMainrecipesByCategory = require("./recipes/getMainrecipesByCategory");
const getRecipesByCategory = require("./recipes/getRecipesByCategory");
const searchRecipe = require("./recipes/searchRecipe");
const getRecipeById = require("./recipes/getRecipeById");
const getRecipeByIngredients = require("./recipes/getRecipeByIngredients");
const getPopularRecipes = require("./recipes/getPopularRecipes");

module.exports = {
  getCategory,
  getIngredientsList,
  getMainrecipesByCategory,
  getRecipesByCategory,
  searchRecipe,
  getRecipeById,
  getRecipeByIngredients,
  getPopularRecipes,
};
