const { Recipe } = require("../../models/recipe");
const { aggregateOpts } = require("../../constants");

const getRecipesByTitle = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  const { title } = req.params;
  const curPage = +page;
  const skip = (curPage - 1) * +limit;

  const result = await Recipe.aggregate(
    aggregateOpts.getOptionsAggArr1({
      $match: { title },
    })
  ).facet({
    metaData: [{ $count: "total" }, { $addFields: { curPage } }],
    recipeData: [{ $skip: +skip }, { $limit: +limit }],
  });

  res.json(result[0]);
};
module.exports = getRecipesByTitle;