var express = require('express');
var router = express.Router();
const Shop = require("../models/shop")
const jwt = require("jsonwebtoken")

router.get("/", (req, res) => {
    Shop.find({}).then(shop => {
        res.send(shop)
    })
})

router.post("/", (req, res) => {
    //const token = req.headers['authorization']
    //jwt.verify(token, 'secret', function(err, decoded){
    //    if(err) return res.send("error");
    //    else{
    let shopItem = new Shop(req.body)
    shopItem.save().then(shopItem => {
    res.send(shopItem)
    //        })
    //    }
    })
})

module.exports = router;
