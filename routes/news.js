var express = require('express');
var router = express.Router();

router.put("/", (req, res) => {
    console.log(req.body);
    res.send("Goodbuy");
})

module.exports = router;
