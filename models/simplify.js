const mongoose = require('mongoose')
const Schema = mongoose.Schema
const simplifySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('simplify', simplifySchema)