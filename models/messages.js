const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
const schema = new mongoose.Schema({
  from: String,
  to: String,
  chat: String,
  text: String,
})
module.exports = mongoose.model("Messages", schema)