const { Recipe, User } = require('../../models');

const { HttpError } = require('../../helpers');

const addFavorites = async (req, res) => {
  const { _id: owner } = req.user;
  const { recipeId: id } = req.params;

  await Recipe.findByIdAndUpdate(
    id,
    { $addToSet: { favorites: owner } },
    { new: true }
  );

  const result = await Recipe.findById(id, '_id');

  await User.findByIdAndUpdate(
    owner,
    { $addToSet: { favorites: id } },
    { new: true }
  );

  const user = await User.findById(owner, '_id favorites');

  if (!result || !user) {
    throw HttpError(404, 'Not Found');
  }

  res.json({
    user,
    result,
  });
};

module.exports = addFavorites;