const express = require('express')
const router = express.Router()

const Simplify = require('../../models/simplify')
const getRandomWord = require('../../randomword')

router.post('/', (req, res) => {
  const name = req.body.url
  console.log('req.body', req.body)

  const localUrl = req.protocol + '://' + req.get('host')
  console.log(req.protocol)
  console.log(req.get('host'))
  console.log(localUrl)

  let shortUrl = ""

  Simplify.find()
    .lean()
    .then(item => {
      const check = item.some(link => link.name === name)

      if (check) {
        const index = item.findIndex(link => link.name === name)
        console.log(index)
        shortUrl = item[index].shortUrl
      } else {
        // shortUrl = `http://localhost:${PORT}/${getRandomWord(5)}`
        shortUrl = `${localUrl}/${getRandomWord(5)}`
        Simplify.create({ name, shortUrl })
      }
      res.render('result', { Url: shortUrl })
    })
    .catch(error => console.log(error))
})


module.exports = router