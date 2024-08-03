// controllers/recipes/get.js
const Recipes = require("../../models/recipe.model");
const {
  fetchIngredients,
  fetchRecipes,
} = require("../../services/recipes.service");
const Category = require("../../models/category.model");

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
    res.status(500).json({ message: "Error fetching recipes" });
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
    const recipes = await Recipes.find({ category }).skip(offset).limit(limit);

    if (!recipes.length) {
      return res
        .status(404)
        .json({ message: `No recipes found for category ${category}` });
    }

    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching recipes by category" });
  }
};

const getIngredientsList = async (req, res) => {
  try {
    const ingredients = await fetchIngredients();

    res.json({ ingredients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching recipe" });
  }
};

const searchRecipe = async (req, res) => {
  const { keyword } = req.query;
  try {
    if (!keyword) {
      return res.status(400).json({ message: "Keyword is required" });
    }
    const allRecipes = await fetchRecipes();
    const filteredRecipes = allRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(keyword.toLowerCase())
    );

    res.status(200).json(filteredRecipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes" });
  }
};

module.exports = {
  getMainrecipesByCategory,
  getCategory,
  getRecipesByCategory,
  getIngredientsList,
  searchRecipe,
};
