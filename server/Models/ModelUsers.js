const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    icon: String,
    name: String,
    surname: String,
    email: String,
    role: String,
    status: String,
    number: String,
    language: String,
    password: String
})

const Users = mongoose.model('users', usersSchema, 'users');
module.exports = Users