const mongoose = require('mongoose');

const historyShema = new mongoose.Schema({
    date: Date,
    user: String,
    action: String,
    type: String,
    item: String,
    target: String,
    note: String
})

const History = mongoose.model('history', historyShema, 'history');
module.exports = History;