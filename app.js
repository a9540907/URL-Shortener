const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000


const Simplify = require('./models/simplify')
const getRandomWord = require('./randomword')

const app = express()
mongoose.connect('mongodb://localhost/Url-shortener', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {

  res.render('index')
})


app.post('/simplify', (req, res) => {
  const name = req.body.url

  const localUrl = req.protocol + '://' + req.get('host')

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



app.get('/:id', (req, res) => {
  // const newUrl = `http://localhost:${PORT}${req.url}`
  const newUrl = req.protocol + '://' + req.get('host') + req.originalUrl

  Simplify.findOne({ shortUrl: newUrl })
    .lean()
    .then(item => res.redirect(item.name))
})

app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})

