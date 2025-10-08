const mongoose = require('mongoose');

const assetsSchema = new mongoose.Schema({
  name: String,
  company: String,
  contact: String,
  status: String
})

const Assets = mongoose.model('assets', assetsSchema, 'assets');
module.exports = Assets