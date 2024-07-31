// routes/recipes.routes.js

const express = require("express");
const recipesRouter = express.Router();

const { getMainrecipesByCategory } = require("../controllers/recipes/get");

recipesRouter.get("/main-page", getMainrecipesByCategory);

module.exports = { recipesRouter };
