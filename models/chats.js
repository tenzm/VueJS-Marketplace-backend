const mongoose = require("mongoose")
const schema = new mongoose.Schema({
  title: String,
  img: String,
  username: String,
  users: Array,
})
const model = mongoose.model("Chats", schema)

module.exports = model