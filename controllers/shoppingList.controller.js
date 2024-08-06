// controllers/shoppingList.controller.js

const addProductToShoppingList = require("./shoppingList/addProductToShoppingList");
const removeProductFromShoppingList = require("./shoppingList/removeProductFromShoppingList");
const getShoppingList = require("./shoppingList/getShoppingList");

module.exports = {
  addProductToShoppingList,
  removeProductFromShoppingList,
  getShoppingList,
};
