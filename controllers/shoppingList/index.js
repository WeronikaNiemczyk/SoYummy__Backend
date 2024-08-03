const getShoppingList = require('./getShoppingList');
const addToShoppingList = require('./addToShoppingList');
const removeFromShoppingList = require('./removeFromShoppingList');
const { ctrlWrapper } = require('../../helpers');

const shoppingList = {
  getShoppingList: ctrlWrapper(getShoppingList),
  addToShoppingList: ctrlWrapper(addToShoppingList),
  removeFromShoppingList: ctrlWrapper(removeFromShoppingList),
};
module.exports = shoppingList;