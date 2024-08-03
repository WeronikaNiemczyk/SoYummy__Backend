const { Recipe, User } = require('../../models/recipe');

const { HttpError } = require('../../helpers');

const updateFavorites = async (req, res) => {
  const { _id: owner } = req.user;
  const { recipeId: id } = req.params;
  const { favorites } = req.query;

  const result =
    favorites === 'true'
      ? (await User.findByIdAndUpdate(owner, {
          $addToSet: { favorites: id },
        })) &&
        (await Recipe.findByIdAndUpdate(
          id,
          { $addToSet: { favorites: owner } },
          { new: true }
        ))
      : (await User.findByIdAndUpdate(owner, { $pull: { favorites: id } })) &&
        (await Recipe.findByIdAndUpdate(
          id,
          { $pull: { favorites: owner } },
          { new: true }
        ));

  if (!result) {
    throw HttpError(404, 'Not Found');
  }

  res.status(200).json({ result });
};

module.exports = updateFavorites;