const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.json("All good in here, Serghei")
})

// Auth routes
router.use('/auth', require('./auth.routes'))

// Work routes
router.use('/work', require('./work.routes'))

// Upload routes
router.use('/upload', require('./upload.routes'))


module.exports = router
