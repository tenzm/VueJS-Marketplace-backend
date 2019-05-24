var express = require('express');
var router = express.Router();
const News = require("../models/news")
const jwt = require("jsonwebtoken")

router.get("/", (req, res) => {
    News.find().then(news => {
        console.log(news)
        res.send(news)
    })
})

router.post("/", (req, res) => {
    const token = req.headers['authorization']
    jwt.verify(token, 'secret', function(err, decoded){
        if(err) return res.send("error");
        else{
            let news = new News(req.body)
            news.save().then(news => {
                res.send(news)
            })
        }
    })
})

module.exports = router;
