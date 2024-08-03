const { Recipe } = require("../../models/recipe");

const { HttpError } = require("../../helpers");

const getRecipesPopular = async (req, res) => {
  const { page = 1, limit = 4 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Recipe.find(
    { "favorites.15": { $exists: true } },
    "-createdAt -updatedAt",
    { skip, limit }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getRecipesPopular;