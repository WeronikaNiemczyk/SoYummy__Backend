// controllers/recipes/get.js

const Recipes = require("../../models/recipe.model");

const getMainrecipesByCategory = async (req, res, next) => {
  try {
    const allrecipes = await Recipes.find();

    const groupedByCategory = allrecipes.reduce((acc, recipe) => {
      const category = recipe.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(recipe);
      return acc;
    }, {});

    const recipesByCategory = Object.keys(groupedByCategory).map((category) => {
      const recipes = groupedByCategory[category];

      const randomrecipes = recipes.sort(() => 0.5 - Math.random()).slice(0, 4);
      return { category, recipes: randomrecipes };
    });

    res.json(recipesByCategory);
  } catch (err) {
    next(err);
  }
};

module.exports = { getMainrecipesByCategory };
