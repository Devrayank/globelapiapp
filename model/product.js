const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, default: null },
  sku: { type: String, default: null },
  category_id: { type: String },
  subcategory_id: { type: String },
  detail: { type: String },
  token: { type: String },
});



module.exports = mongoose.model("product", productSchema);