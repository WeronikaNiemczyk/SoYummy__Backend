// routes/recipes.routes.js

const express = require("express");
const recipesRouter = express.Router();

const {
  getMainrecipesByCategory,
  getCategory,
  getRecipesByCategory,
} = require("../controllers/recipes/get");

recipesRouter.get("/main-page", getMainrecipesByCategory);
recipesRouter.get("/category-list", getCategory);
recipesRouter.get("/:category", getRecipesByCategory);

module.exports = { recipesRouter };
