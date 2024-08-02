/* eslint-disable camelcase */
const { Recipe } = require("../../models/recipe");

const getFavorites = async (req, res) => {
  const { page = 1, per_page = 4 } = req.query;
  const curPage = +page;
  const skip = (curPage - 1) * +per_page;
  const { _id: owner } = req.user;

  const result = await Recipe.aggregate([
    { $match: { favorites: { $in: [owner] } } },
  ])
    .facet({
      metaData: [{ $count: "total" }, { $addFields: { curPage } }],
      recipeData: [{ $skip: +skip }, { $limit: +per_page }],
    })
    .unwind("metaData");

  res.json(result);
};

module.exports = getFavorites;