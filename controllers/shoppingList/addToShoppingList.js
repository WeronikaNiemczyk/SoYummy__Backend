const { HttpError } = require("../../helpers");
const { User, Ingredient } = require("../../models");

const addToShoppingList = async (req, res) => {
  const user = req.user;

  const { id: productId } = req.params;
  const { measure } = req.query;

  const ingredient = await Ingredient.findById(productId);

  if (!ingredient) {
    throw HttpError(404, "No such ingredient");
  }
  const result = await User.findByIdAndUpdate(
    user._id,
    {
      $push: { shoppingList: { productId, measure } },
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

  res.status(201).json(shoppingList);
};

module.exports = addToShoppingList;