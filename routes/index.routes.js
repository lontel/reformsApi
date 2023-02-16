const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.json("All good in here, Serghei")
})

// Auth routes
router.use('/auth', require('./auth.routes'))

// Upload routes
router.use('/upload', require('./upload.routes'))


module.exports = router
