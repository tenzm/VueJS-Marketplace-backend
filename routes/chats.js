const express = require("express")
const router = express.Router()
const Users = require("../models/users")
const Chats = require("../models/chats")
const Messages = require("../models/messages")
const {
  check_auth
} = require("../middleware/auth")

router.get("/", check_auth, (req, res) => {})


router.get("/messages", check_auth, (req, res) => {
  const userId = req.user._id
  Messages.find({
    $or: [{
      from: userId
    }, {
      to: userId
    }]
  }).then(messages => {
    res.send(messages)
  })
})

router.post("/messages/check", check_auth, (req, res) => {
  const userId = req.user._id
  Messages.find({
    $or: [{
      from: userId
    }, {
      to: userId
    }]
  }).then(messages => {
    console.log(req.body);
    res.send(req.body.count != messages.length);
  })
})

router.post("/messages", check_auth, (req, res) => {
  message_req = req.body;
  message = new Messages(message_req)
  message.save().then(m => {
    res.send(true);
  }).catch(e => {
    res.send(false)
  })
  /*message.from = req.user._id
  if (!message.chat) {
    let chat = new Chats()
    message.chat = chat._id
    chat.save()
  }
  message = new Messages(message)
  message.save().then(m => {
    res.send(message)
  })*/
})

module.exports = router