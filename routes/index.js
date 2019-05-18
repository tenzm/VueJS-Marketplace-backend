const news = require("./news")

 function route(app) {
  app.use("/news", news)
}

 module.exports = route