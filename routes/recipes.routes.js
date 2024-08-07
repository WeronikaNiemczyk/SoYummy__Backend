// routes/recipes.routes.js

const express = require("express");
const recipesRouter = express.Router();
const auth = require("../middlewares/auth");
const recipesController = require("../controllers/recipe.controller");
const shoppingListController = require("../controllers/shoppingList.controller");
const ownRecipesController = require("../controllers/ownRecipes.controller");
const favoriteControllers = require("../controllers/favorite.controllers");

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipes related endpoints
 */

/**
 * @swagger
 * /recipes/main-page:
 *   get:
 *     summary: Get main recipes by category
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Successfully retrieved recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 */
recipesRouter.get("/main-page", recipesController.getMainrecipesByCategory);

/**
 * @swagger
 * /recipes/category-list:
 *   get:
 *     summary: Get list of recipe categories
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Successfully retrieved categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
recipesRouter.get("/category-list", recipesController.getCategory);

/**
 * @swagger
 * /recipes/search:
 *   get:
 *     summary: Search for recipes
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Successfully retrieved recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 */
recipesRouter.get("/search", recipesController.searchRecipe);

/**
 * @swagger
 * /recipes/{category}:
 *   get:
 *     summary: Get recipes by category
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Recipe category
 *     responses:
 *       200:
 *         description: Successfully retrieved recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 */
recipesRouter.get("/:category", recipesController.getRecipesByCategory);

/**
 * @swagger
 * /recipes/recipe/{id}:
 *   get:
 *     summary: Get recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Successfully retrieved recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 */
recipesRouter.get("/recipe/:id", recipesController.getRecipeById);

/**
 * @swagger
 * /recipes/popular/recipe:
 *   get:
 *     summary: Get popular recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Successfully retrieved popular recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 */
recipesRouter.get("/popular/recipe", recipesController.getPopularRecipes);

/**
 * @swagger
 * /recipes/ownRecipes/user:
 *   get:
 *     summary: Get user's own recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Successfully retrieved user's recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       401:
 *         description: Unauthorized
 */
recipesRouter.get("/ownRecipes/user", auth, ownRecipesController.getOwnRecipes);

/**
 * @swagger
 * /recipes/ownRecipes:
 *   post:
 *     summary: Add a new recipe
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *       401:
 *         description: Unauthorized
 */
recipesRouter.post("/ownRecipes", auth, ownRecipesController.addOwnRecipe);

/**
 * @swagger
 * /recipes/ownRecipes/{id}:
 *   delete:
 *     summary: Delete a recipe
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       401:
 *         description: Unauthorized
 */
recipesRouter.delete(
  "/ownRecipes/:id",
  auth,
  ownRecipesController.deleteOwnRecipe
);

/**
 * @swagger
 * /recipes/favorites:
 *   post:
 *     summary: Add recipe to favorites
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipeId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Recipe added to favorites successfully
 *       401:
 *         description: Unauthorized
 */
recipesRouter.post("/favorites", auth, favoriteControllers.addFavoriteRecipe);

/**
 * @swagger
 * /recipes/favorites/user:
 *   get:
 *     summary: Get user's favorite recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Successfully retrieved user's favorite recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       401:
 *         description: Unauthorized
 */
recipesRouter.get(
  "/favorites/user",
  auth,
  favoriteControllers.getFavoriteRecipes
);

/**
 * @swagger
 * /recipes/favorites/{id}:
 *   delete:
 *     summary: Remove recipe from favorites
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe removed from favorites successfully
 *       401:
 *         description: Unauthorized
 */
recipesRouter.delete(
  "/favorites/:id",
  auth,
  favoriteControllers.removeFavoriteRecipe
);

/**
 * @swagger
 * /recipes/shopping-list/add:
 *   post:
 *     summary: Add product to shopping list
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product added to shopping list successfully
 *       401:
 *         description: Unauthorized
 */
recipesRouter.post(
  "/shopping-list/add",
  auth,
  shoppingListController.addProductToShoppingList
);

/**
 * @swagger
 * /recipes/shopping-list/remove:
 *   delete:
 *     summary: Remove product from shopping list
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product removed from shopping list successfully
 *       401:
 *         description: Unauthorized
 */
recipesRouter.delete(
  "/shopping-list/remove",
  auth,
  shoppingListController.removeProductFromShoppingList
);

/**
 * @swagger
 * /recipes/shopping-list/user:
 *   get:
 *     summary: Get user's shopping list
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Successfully retrieved shopping list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 */
recipesRouter.get(
  "/shopping-list/user",
  auth,
  shoppingListController.getShoppingList
);

module.exports = { recipesRouter };
