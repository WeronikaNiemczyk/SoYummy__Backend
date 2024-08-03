const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const removeFromShoppingList = async (req, res) => {
  const user = req.user;
  const { id: productId } = req.params;
  const { measure } = req.query;

  const productIndex = user.shoppingList.findIndex((item) => {
    return (
      String(item.productId) === String(productId) && item.measure === measure
    );
  });

  if (productIndex === -1) {
    throw HttpError(404, `No product with id=${productId} in shopping list`);
  }

  const deletedId = user.shoppingList.splice(productIndex, 1);

  const result = await User.findByIdAndUpdate(
    req.user._id,
    {
      shoppingList: user.shoppingList,
    },
    { new: true }
  )
    .select("shoppingList")
    .populate({
      path: "shoppingList.productId",
      ref: "ingredients",
    });
  const { shoppingList } = result.toObject();

  shoppingList.forEach((ingr) => {
    ingr.title = ingr.productId.ttl;
    ingr.thumb = ingr.productId.thb;
    ingr.productId = ingr.productId._id;
  });
  res.json(deletedId);
};

module.exports = removeFromShoppingList;