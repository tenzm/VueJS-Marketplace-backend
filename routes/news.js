var express = require('express');
var router = express.Router();
const News = require("../models/news")
const jwt = require("jsonwebtoken")
const { check_auth } = require("../middleware/auth")

router.get("/", (req, res) => {
    News.find({}).sort({createdAt: -1}).then(news => {
        res.send(news)
    })
})

router.post("/", check_auth, (req, res) => {
        let news = new News(req.body)
        news.save().then(news => {
        res.send(news)
    })
})

module.exports = router;
