// controllers/recipes/getRecipesByCategory.js

const Recipes = require("../../models/recipe.model");

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

module.exports = getRecipesByCategory;
