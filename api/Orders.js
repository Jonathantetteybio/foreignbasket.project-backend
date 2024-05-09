const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  price: Number,
  products: Array,
  email: String,
  address: Object,
});

module.exports = mongoose.model("Order", OrderSchema);
