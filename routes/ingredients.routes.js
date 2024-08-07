// routes/ingredients.routes.js

const express = require("express");
const ingredientsRouter = express.Router();
const ingredientsController = require("../controllers/recipe.controller");

/**
 * @swagger
 * tags:
 *   name: Ingredients
 *   description: Ingredients related endpoints
 */

/**
 * @swagger
 * /ingredients/list:
 *   get:
 *     summary: Get list of ingredients
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
ingredientsRouter.get("/list", ingredientsController.getIngredientsList);

/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Get recipes by ingredients
 *     tags: [Ingredients]
 *     parameters:
 *       - in: query
 *         name: ingredients
 *         schema:
 *           type: string
 *         required: true
 *         description: List of ingredients separated by commas
 *     responses:
 *       200:
 *         description: Successfully retrieved recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Invalid input
 */
ingredientsRouter.get("/", ingredientsController.getRecipeByIngredients);

module.exports = { ingredientsRouter };
