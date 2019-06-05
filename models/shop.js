const mongoose = require("mongoose")
const Schema = mongoose.Schema
const shopSchema = new Schema({
  name: String,
  type: String,
  options: {},
  price: String,
  img: String
})
const ShopItem = mongoose.model("Shop", shopSchema)

module.exports = ShopItem