// routes/recipes.routes.js

const express = require("express");
const recipesRouter = express.Router();

const { getRecipeById } = require("../controllers/recipes/getById");
// const getRecipeById = require("../controllers/recipes/getById");
const {
  getMainrecipesByCategory,
  getCategory,
  getRecipesByCategory,
  searchRecipe,
} = require("../controllers/recipes/get");

recipesRouter.get("/main-page", getMainrecipesByCategory);
recipesRouter.get("/category-list", getCategory);
recipesRouter.get("/search", searchRecipe);
recipesRouter.get("/:category", getRecipesByCategory);
recipesRouter.get("/recipe/:id", getRecipeById);


module.exports = { recipesRouter };
