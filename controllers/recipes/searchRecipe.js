// controllers/recipes/searchRecipe.js

const Recipe = require("../../models/recipe.model");

const searchRecipe = async (req, res) => {
  const { keyword } = req.query;
  try {
    if (!keyword) {
      return res.status(400).json({ message: "Keyword is required" });
    }

    const recipes = await Recipe.find({ title: new RegExp(keyword, "i") });

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes" });
  }
};

module.exports = searchRecipe;
