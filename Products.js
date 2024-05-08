const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: String,
  imageUrl: String,
  price: Number,
});

module.exports = mongoose.model("product", ProductSchema);
