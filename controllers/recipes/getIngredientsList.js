// controllers/recipes/getIngredientsList.js

const { fetchIngredients } = require("../../services/recipes.service");

const getIngredientsList = async (req, res) => {
  try {
    const ingredients = await fetchIngredients();

    res.json({ ingredients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching recipe" });
  }
};

module.exports = getIngredientsList;
