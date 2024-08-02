const { Recipe } = require("../../models/recipe");
const { HttpError } = require("../../helpers/HttpError");

const getRecipesByCategory = async (req, res) => {
  const { alias } = req.params;
  const { page = 1, limit = 8 } = req.query;
  const curPage = +page;
  const skip = (curPage - 1) * +limit;

  const result = await Recipe.aggregate([
    {
      $match: { category: alias },
    },
    {
      $lookup: {
        from: "ingredients",
        localField: "ingredients.id",
        foreignField: "_id",
        as: "ingr_info",
      },
    },

    {
      $unset: ["ingredients._id", "createdAt", "updatedAt"],
    },
  ])
    .facet({
      metaData: [{ $count: "total" }, { $addFields: { curPage } }],
      recipeData: [{ $skip: +skip }, { $limit: +limit }],
    })
    .unwind("metaData");

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};
module.exports = getRecipesByCategory;