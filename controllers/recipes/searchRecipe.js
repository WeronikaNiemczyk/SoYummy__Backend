// controllers/recipes/searchRecipe.js

const { fetchRecipes } = require("../../services/recipes.service");

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

module.exports = searchRecipe;
