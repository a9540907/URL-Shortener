const express = require('express')
const router = express.Router()
const Simplify = require('../../models/simplify')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/:shorten', (req, res) => {
  // const newUrl = `http://localhost:${PORT}${req.url}`
  // console.log(req.params)
  const newUrl = req.protocol + '://' + req.get('host') + req.originalUrl

  Simplify.findOne({ shortUrl: newUrl })
    .lean()
    .then(item => res.redirect(item.name))
})

module.exports = router