const jwt = require("jsonwebtoken")
const Users = require("../models/users")
function check_auth(req, res, next) {
  const token = req.headers["authorization"]
  jwt.verify(token, "secret", function(err, decoded) {
    if (err) return res.status("401").send("error")
    const username = decoded.data.username
    Users.findOne({ username }).then(user => {
      req.user = user
      next()
    })
  })
}

module.exports = {
  check_auth,
}