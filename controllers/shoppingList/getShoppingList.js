const { HttpError } = require('../../helpers');
const { User } = require('../../models');

const getShoppingList = async (req, res) => {
  const { _id } = req.user;

  const { shoppingList } = await User.findById(_id).populate({
    path: 'shoppingList.productId',
    ref: 'ingredients',
  });

  if (!shoppingList) throw HttpError(404, 'Not Found');

  const result = shoppingList.toObject();

  result.forEach(ingr => {
    ingr.title = ingr.productId.ttl;
    ingr.thumb = ingr.productId.thb;
    ingr.productId = ingr.productId._id;
  });

  res.json(result);
};

module.exports = getShoppingList;