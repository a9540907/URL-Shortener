const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const simplify = require('./modules/result')

router.use('/', home)
router.use('/simplify', simplify)

module.exports = router