const mongoose = require('mongoose');

const assetsSchema = new mongoose.Schema({
  name: String,
  product: String,
  supplier: String,
  location: String,
  department: String,
  serialNumber: String,
  orderNumber: String,
  notes: String,
  company: String,
  contact: String,
  status: String,
  purchaseDate: Date,
  warrantyExpirationDate: Date,
  icon: String,
})

const Assets = mongoose.model('assets', assetsSchema, 'assets');
module.exports = Assets