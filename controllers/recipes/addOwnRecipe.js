// controllers/recipes/addOwnRecipe.js

const Recipes = require("../../models/recipe.model");

const addOwnRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipes({
      ...req.body,
      owner: req.user.id,
    });
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(500).json({ message: "Error adding recipe" });
  }
};

module.exports = addOwnRecipe;
