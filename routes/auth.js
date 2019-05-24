var express = require("express")
var router = express.Router()
const Users = require("../models/users")
const jwt = require("jsonwebtoken")

 // Залогиниться - найти пользователя, сверить пароль с БД
router.post("/login", (req, res) => {
  let { username, password } = req.body
  Users.findOne({username})
    .then(user => {
      if (user.checkPassword(password)) {
        let token = jwt.sign(
          {
            data: {username},
          },
          "secret",
          { expiresIn: "1h" }
        )
        console.log("success")
        res.send(token)
      }
      throw new Error("=(")
    })
    .catch((err) => {
      res.status("404").send(err)
    })
})

 // Вернуть ok =)
router.post("/logout", (req, res) => {
  res.send("ok")
})

router.post("/check", (req, res) => {
  const token = req.headers['authorization']
    jwt.verify(token, 'secret', function(err, decoded){
        if(err) return res.send(false);
        return res.send(true);
    })
})

 module.exports = router