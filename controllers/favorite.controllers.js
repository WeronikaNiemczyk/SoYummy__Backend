// controllers/favorite.controller.js

const addFavoriteRecipe = require("./favoriteRecipes/addFavoriteRecipe");
const getFavoriteRecipes = require("./favoriteRecipes/getFavoriteRecipes");
const removeFavoriteRecipe = require("./favoriteRecipes/removeFavoriteRecipe");

module.exports = {
  addFavoriteRecipe,
  getFavoriteRecipes,
  removeFavoriteRecipe,
};
