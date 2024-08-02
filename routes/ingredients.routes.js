// routes/ingredients.routes.js

const express = require("express");
const ingredientsRouter = express.Router();

const { getIngredientsList } = require("../controllers/recipes/get");
const { getRecipeByIngredients } = require("../controllers/recipes/getById");

ingredientsRouter.get("/list", getIngredientsList);
ingredientsRouter.get("/", getRecipeByIngredients);

module.exports = { ingredientsRouter };
