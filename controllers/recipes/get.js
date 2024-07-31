// controllers/recipes/get.js

const Recipes = require("../../models/recipe.model");
// const Category = require("../../models/category.model");

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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching recipies" });
  }
};

const getCategory = async (req, res) => {
  try {
    const categories = await Recipes.distinct("category");
    categories.sort();

    res.json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};
module.exports = { getMainrecipesByCategory, getCategory };
