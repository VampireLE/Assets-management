const mongoose = require('mongoose');

const componentsSchema = new mongoose.Schema({
  name: String,
  type: String,
  model: String,
  serialNumber: String,
  location: String,
  assignedTo: String,
  purchaseDate: Date,
  status: String
})

const Components = mongoose.model('components', componentsSchema, 'components');
module.exports = Components;