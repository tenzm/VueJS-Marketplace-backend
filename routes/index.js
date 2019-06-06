const news = require("./news")
const auth = require("./auth")
const users = require("./users")

 function route(app) {
  app.use("/news", news)
  app.use("/auth", auth)
  app.use("/users", users)
  app.use("/uploads", require("./uploads"))
  app.use("/shop", require("./shop"))
  app.use("/chats", require("./chats"))
}

 module.exports = route