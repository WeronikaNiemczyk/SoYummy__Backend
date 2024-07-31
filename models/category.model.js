// models/category.model.js

const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  thumb: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
