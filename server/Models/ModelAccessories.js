const mongoose = require('mongoose');

const accessoriesSchema = new mongoose.Schema({
  name: String,
  category: String,
  company: String,
  status: String
})

const Accessories = mongoose.model('accessories', accessoriesSchema, 'accessories');
module.exports = Accessories