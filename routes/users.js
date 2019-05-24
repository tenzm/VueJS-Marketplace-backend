var express = require("express")
var router = express.Router()
const Users = require("../models/users")
const jwt = require("jsonwebtoken")

 // Залогиниться - найти пользователя, сверить пароль с БД
router.post("/", (req, res) => {
  let { username, password } = req.body
  let user = new Users({ username, password })
  // Сохранение пользователя
  user
    .save()
    .then(() => {
      res.send("ok")
    })
    .catch(err => {
      res.status("418").send("err")
    })
})

 router.delete("/", (req, res) => {
  let { username } = req.body
  Users.findOneAndDelete({ username })
    .then(user => {
      res.send(user)
    })
    .catch(e => {
      res.send(e)
    })
})

 module.exports = router