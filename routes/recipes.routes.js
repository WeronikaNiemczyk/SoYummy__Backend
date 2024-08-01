// routes/recipes.routes.js

const express = require("express");
const recipesRouter = express.Router();

const {
  getMainrecipesByCategory,
  getCategory,
  getRecipesByCategory,
} = require("../controllers/recipes/get");
const getRecipeById = require("../controllers/recipes/getById");

recipesRouter.get("/main-page", getMainrecipesByCategory);
recipesRouter.get("/category-list", getCategory);
recipesRouter.get("/:category", getRecipesByCategory);
recipesRouter.get("/recipe/:id", getRecipeById);

module.exports = { recipesRouter };
