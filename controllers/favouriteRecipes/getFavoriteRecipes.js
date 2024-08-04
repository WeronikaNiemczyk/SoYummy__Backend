// controllers/favouriteRecipes/getFavoriteRecipes.js

const User = require("../../models/user.model");

const getFavoriteRecipes = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("favorites");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log("Favorites:", user.favorites);
    res.status(200).json(user.favorites);
  } catch (error) {
    next(error);
  }
};
module.exports = getFavoriteRecipes;
