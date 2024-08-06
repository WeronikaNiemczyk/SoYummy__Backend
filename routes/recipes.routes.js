// routes/recipes.routes.js

const express = require("express");
const recipesRouter = express.Router();
const auth = require("../middlewares/auth");
const recipesController = require("../controllers/recipe.controller");
const shoppingListController = require("../controllers/shoppingList.controller");
const ownRecipesController = require("../controllers/ownRecipes.controller");
const favoriteControllers = require("../controllers/favorite.controllers");

recipesRouter.get("/main-page", recipesController.getMainrecipesByCategory);
recipesRouter.get("/category-list", recipesController.getCategory);
recipesRouter.get("/search", recipesController.searchRecipe);
recipesRouter.get("/:category", recipesController.getRecipesByCategory);
recipesRouter.get("/recipe/:id", recipesController.getRecipeById);
recipesRouter.get("/popular/recipe", recipesController.getPopularRecipes);

recipesRouter.get("/ownRecipes/user", auth, ownRecipesController.getOwnRecipes);
recipesRouter.post("/ownRecipes", auth, ownRecipesController.addOwnRecipe);
recipesRouter.delete(
  "/ownRecipes/:id",
  auth,
  ownRecipesController.deleteOwnRecipe
);

recipesRouter.post("/favorites", auth, favoriteControllers.addFavoriteRecipe);
recipesRouter.get(
  "/favorites/user",
  auth,
  favoriteControllers.getFavoriteRecipes
);
recipesRouter.delete(
  "/favorites/:id",
  auth,
  favoriteControllers.removeFavoriteRecipe
);

recipesRouter.post(
  "/shopping-list/add",
  auth,
  shoppingListController.addProductToShoppingList
);
recipesRouter.delete(
  "/shopping-list/remove",
  auth,
  shoppingListController.removeProductFromShoppingList
);
recipesRouter.get(
  "/shopping-list/user",
  auth,
  shoppingListController.getShoppingList
);

module.exports = { recipesRouter };
