const { Recipe, User } = require('../../models');

const { HttpError } = require('../../helpers');

const removeFavorites = async (req, res) => {
  const { _id: owner } = req.user;
  const { recipeId: id } = req.params;

  const result = await Recipe.findByIdAndUpdate(
    id,
    { $pull: { favorites: owner } },
    { new: true }
  );

  const user = await User.findByIdAndUpdate(
    owner,
    { $pull: { favorites: id } },
    { new: true }
  );

  if (!result || !user) {
    throw HttpError(404, 'Not Found');
  }

  res.json({ message: 'Delete success' });
};

module.exports = removeFavorites;