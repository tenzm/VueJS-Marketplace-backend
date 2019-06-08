var express = require("express")
var router = express.Router()
const Users = require("../models/users")
const jwt = require("jsonwebtoken")
const { check_auth } = require("../middleware/auth")

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

router.get("/cart", (req, res) => {
  const token = req.headers['authorization']
    jwt.verify(token, 'secret', function(err, decoded){
        let username = decoded.data.username;
        Users.findOne({username}).then(user => {
          res.send(user.shopcart)
        })
    })
})

router.post("/cart", (req, res) => {
  const token = req.headers['authorization'];
    jwt.verify(token, 'secret', function(err, decoded){
      console.log(decoded);
        let username = decoded.data.username;
        Users.findOne({username}).then(user => {
          user.shopcart.push(req.body.id);
          user.save()
          .then(() => {
            res.send(true)
          })
          .catch(err => {
            res.send(false)
          })
        })
    })
})

router.post("/uncart", (req, res) => {
  const token = req.headers['authorization']
    jwt.verify(token, 'secret', function(err, decoded){
        let username = decoded.data.username;
        Users.findOne({username}).then(user => {
          new_shopcart = [];
          for(let i = 0; i < user.shopcart.length; i++){
              if(user.shopcart[i] != req.body.id){
                new_shopcart.push(user.shopcart[i]);
              }
          }
          user.shopcart = new_shopcart;
          console.log(user.shopcart);
          user.save()
          .then(() => {
            res.send(true)
          })
          .catch(err => {
            res.send(false)
          })
        })
    })
})

 module.exports = router