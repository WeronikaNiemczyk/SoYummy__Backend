// models/ingredients.model.js

const mongoose = require("mongoose");
const { Schema } = mongoose;

const ingredientsSchema = new Schema({
  ttl: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    trim: true,
  },
  thb: {
    type: String,
    trim: true,
  },
  t: { type: String },
});

const Ingredients = mongoose.model("ingredients", ingredientsSchema);

module.exports = Ingredients;
