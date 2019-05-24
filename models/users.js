const mongoose = require("mongoose")
const Schema = mongoose.Schema
const crypto = require("crypto")

 const schema = new Schema({
  username: {
      required: true,
      unique: true,
      type: String
    },
  passwordHash: String,
  salt: String
}, {
    timestamps: true
})

 schema.virtual('password').set(function(password){
    this.salt = crypto.randomBytes(256).toString('base64') // Создали случайную соль
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1')
})

 schema.method('checkPassword', function(password) {
   let hash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1')
   return hash == this.passwordHash
})

 module.exports = mongoose.model("Users", schema)