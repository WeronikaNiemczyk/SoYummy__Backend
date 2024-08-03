const { ctrlWrapper } = require("../../helpers");
const getCategoriesList = require("./getCategoriesList");
const getRecipesByCategory = require("./getRecipesByCategory");
const getRecipeById = require("./getRecipeById");
const getRecipesByTitle = require("./getRecipesByTitle");
const getRecipesPopular = require("./getRecipesPopular");
const getRecipes = require("./getRecipes");
const addFavorites = require("./addFavorites");
const removeFavorites = require("./removeFavorites");
const getAllRecipesTitles = require("./getAllRecipesTitles");
const getFavorites = require("./getFavorites");

const recipes = {
  getAllRecipesTitles: ctrlWrapper(getAllRecipesTitles),
  getCategoriesList: ctrlWrapper(getCategoriesList),
  getRecipesByCategory: ctrlWrapper(getRecipesByCategory),
  getRecipeById: ctrlWrapper(getRecipeById),
  getRecipesByTitle: ctrlWrapper(getRecipesByTitle),
  getRecipesPopular: ctrlWrapper(getRecipesPopular),
  addFavorites: ctrlWrapper(addFavorites),
  removeFavorites: ctrlWrapper(removeFavorites),
  getFavorites: ctrlWrapper(getFavorites),
  getRecipes: ctrlWrapper(getRecipes),
};
module.exports = recipes;