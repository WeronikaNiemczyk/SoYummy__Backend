// controllers/recipes/getById.js

const fetchRecipe = require("../../services/recipes.service");

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

module.exports = getRecipeById;
