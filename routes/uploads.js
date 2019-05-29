const express = require("express")
const router = express.Router()
const multer = require("multer")
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads")
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

 const upload = multer({ storage: storage })

 router.put("/image", upload.single("image"), (req, res) => {
  console.log(req.file)
  res.send(req.file.path)
})

 module.exports = router