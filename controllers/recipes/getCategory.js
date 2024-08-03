// controllers/recipes/getCategory.js

const Recipes = require("../../models/recipe.model");

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

module.exports = getCategory;
