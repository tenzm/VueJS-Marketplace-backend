var express = require("express")
var router = express.Router()
const Users = require("../models/users")
const jwt = require("jsonwebtoken")
const {
  check_auth
} = require("../middleware/auth")

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

router.get("/", check_auth, (req, res) => {
  Users.find({}).then(user => {
    let users = {}
    for(let i = 0; i < user.length; i++){
      if(user[i].username != req.user.username){
        users[(user[i]._id).toString()] = user[i].username;
      }
    }
    res.send({"me": {"username": req.user.username, "id": req.user._id}, "users": users});
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