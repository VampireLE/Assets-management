const mongoose = require('mongoose');

const accessoriesSchema = new mongoose.Schema({
  name: String,
  category: String,
  company: String,
  status: String
})

const Assets = mongoose.model('accessories', accessoriesSchema, 'accessories');
module.exports = Assets