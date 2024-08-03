const { Recipe } = require("../../models/recipe");
const mongoose = require("mongoose");
const { aggregateOpts } = require("../../constants");
const { HttpError } = require("../../helpers/HttpError");

const getRecipeById = async (req, res) => {
  const { recipeId } = req.params;

  const result = await Recipe.aggregate(
    aggregateOpts.getOptionsAggArr1({
      $match: { _id: mongoose.Types.ObjectId(recipeId) },
    })
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = getRecipeById;