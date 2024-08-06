// controllers/ownRecipes.controller.js

const addOwnRecipe = require("./ownRecipes/addOwnRecipe");
const getOwnRecipes = require("./ownRecipes/getOwnRecipes");
const deleteOwnRecipe = require("./ownRecipes/deleteOwnRecipe");

module.exports = {
  addOwnRecipe,
  getOwnRecipes,
  deleteOwnRecipe,
};
