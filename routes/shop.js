var express = require('express');
var router = express.Router();
const Shop = require("../models/shop")
const jwt = require("jsonwebtoken")
const { check_auth } = require("../middleware/auth")

router.get("/", (req, res) => {
    Shop.find({}).then(shop => {
        res.send(shop)
    })
})

router.post("/", check_auth, (req, res) => {
    let shopItem = new Shop(req.body)
    shopItem.save().then(shopItem => {
    res.send(shopItem)
    })
})

module.exports = router;
