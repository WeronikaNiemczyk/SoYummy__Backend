const { Recipe } = require("../../models/recipe");

// TODO: the variables "categoriesPopular" and "qtty" are planned to come from the frontend
const categoriesPopular = ["Breakfast", "Miscellaneous", "Vegan", "Dessert"];
const qtty = 4;

const getRecipes = async (req, res) => {
  const recipes = await Recipe.find(
    { category: { $in: categoriesPopular } },
    "-createdAt -updatedAt -area -instructions -description -time -favorites -likes -youtube -tags"
  ).sort([
    ["popularity", -1],
    ["title", 1],
  ]);

  const groupBy = (xs, key) => {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const result = groupBy(recipes, "category"); // the variable "grouped" is object

  Object.keys(result).forEach((key) => {
    result[key] = result[key].slice(0, qtty);
  });

  res.json(result);
};
module.exports = getRecipes;