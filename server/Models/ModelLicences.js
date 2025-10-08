const mongoose = require('mongoose');

const licencesSchema = new mongoose.Schema({
    name: String,
    category: String,
    company: String,
    status: String
})

const Licences = mongoose.model('licences', licencesSchema, 'licences');
module.exports = Licences