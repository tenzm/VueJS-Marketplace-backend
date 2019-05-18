var express = require('express');
var router = express.Router();
const News = require("../models/news")

router.get("/", (req, res) => {
    News.find().then(news => {
        console.log(news)
        res.send(news)
    })
})

router.post("/", (req, res) => {
    let news = new News(req.body)
    news.save().then(news => {
        res.send(news)
    })
})

module.exports = router;
