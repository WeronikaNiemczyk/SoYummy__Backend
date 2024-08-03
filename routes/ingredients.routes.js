// routes/ingredients.routes.js

const express = require("express");
const ingredientsRouter = express.Router();
const ingredientsController = require("../controllers/recipe.controller");

ingredientsRouter.get("/list", ingredientsController.getIngredientsList);
ingredientsRouter.get("/", ingredientsController.getRecipeByIngredients);

module.exports = { ingredientsRouter };
