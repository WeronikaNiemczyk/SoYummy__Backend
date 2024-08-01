// controllers/recipes/get.js

const Recipes = require("../../models/recipe.model");
// const Category = require("../../models/category.model");
const fetchRecipe = require("../../services/recipes.service");

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

const getRecipesByCategory = async (req, res) => {
  const limit = 8;
  const { page = 1 } = req.query;
  const offset = (page - 1) * limit;
  try {
    const { category } = req.params;
    const recipies = await Recipes.find({ category }).skip(offset).limit(limit);

    if (!recipies.length) {
      return res
        .status(404)
        .json({ message: `No recipes found for category ${category}` });
    }

    res.json(recipies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching recipies by category" });
  }
};
const getRecipeById = async (req, res) => {
  try {
    const recipe = await fetchRecipe(req.params.id);
    if (recipe) {
      res.json(recipe);
    } else {
      res
        .status(404)
        .json({ message: `No recipe found for id ${req.params.id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching recipe" });
  }
};

module.exports = {
  getMainrecipesByCategory,
  getCategory,
  getRecipesByCategory,
  getRecipeById,
};
