const { Recipe } = require("../../models/recipe");

const getAllRecipesTitles = async (req, res) => {
  const result = await Recipe.aggregate([
    {
      $group: {
        _id: null,
        recipes: { $push: "$title" },
      },
    },
    { $unset: "_id" },
  ]);

  res.json(result[0]);
};
module.exports = getAllRecipesTitles;