// routes/recipes.routes.js

const express = require("express");
const recipesRouter = express.Router();
const auth = require("../middlewares/auth");
const recipesController = require("../controllers/recipe.controller");

recipesRouter.get("/main-page", recipesController.getMainrecipesByCategory);
recipesRouter.get("/category-list", recipesController.getCategory);
recipesRouter.get("/search", recipesController.searchRecipe);
recipesRouter.get("/:category", recipesController.getRecipesByCategory);
recipesRouter.get("/recipe/:id", recipesController.getRecipeById);

recipesRouter.get("/ownRecipes/user", auth, recipesController.getOwnRecipes);
recipesRouter.post("/ownRecipes", auth, recipesController.addOwnRecipe);
recipesRouter.delete(
  "/ownRecipes/:id",
  auth,
  recipesController.deleteOwnRecipe
);

module.exports = { recipesRouter };
