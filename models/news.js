const mongoose = require("mongoose")
const Schema = mongoose.Schema
const newsSchema = new Schema({
  title: String,
  text: String,
  img: String
})
const News = mongoose.model("News", newsSchema)

 module.exports = News