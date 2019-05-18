require("dotenv").config()
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")

 var app = express()

require("./models")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

 // Подключение маршрутизации
require("./routes/index")(app)

 module.exports = app