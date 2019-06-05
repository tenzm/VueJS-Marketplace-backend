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

router.get("/cart", (req, res) => {
  const token = req.headers['authorization']
    jwt.verify(token, 'secret', function(err, decoded){
        let username = decoded.data.username;
        Users.findOne({username}).then(user => {
          res.send(user.shopcart)
        })
    })
})

function findId(array, value){
  id = -1;
  for(let i = 0; i < array.length; i++){
    if(array[i] == value){
      id = i;
      break;
    }
  }
  return id;
}

router.post("/cart", (req, res) => {
  const token = req.headers['authorization'];
    jwt.verify(token, 'secret', function(err, decoded){
      console.log(decoded);
        let username = decoded.data.username;
        Users.findOne({username}).then(user => {
          if(findId(user.shopcart, req.body.id) < 0){
          user.shopcart.push(req.body.id);
          user.save()
          .then(() => {
            res.send(true)
          })
          .catch(err => {
            res.send(false)
          })
          res.send(true)
          }
        })
    })
})

router.post("/uncart", (req, res) => {
  const token = req.headers['authorization']
    jwt.verify(token, 'secret', function(err, decoded){
        let username = decoded.data.username;
        Users.findOne({username}).then(user => {
          del_id = findId(user.shopcart, req.body.id);
          user.shopcart.splice(del_id, 1);
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