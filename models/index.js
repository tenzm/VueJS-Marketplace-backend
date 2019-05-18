const mongoose = require("mongoose")
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
// Подключение к БД
mongoose.connect(
  `mongodb+srv://${username}:${password}@tenzm-hg17w.gcp.mongodb.net/test?retryWrites=true`,
  {
    useNewUrlParser: true
  }
)