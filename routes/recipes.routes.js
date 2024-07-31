// routes/recipes.routes.js

const express = require("express");
const recipesRouter = express.Router();

const {
  getMainrecipesByCategory,
  getCategory,
} = require("../controllers/recipes/get");

recipesRouter.get("/main-page", getMainrecipesByCategory);
recipesRouter.get("/category-list", getCategory);

module.exports = { recipesRouter };
