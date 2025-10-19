const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    status: String,
    password: String
})

const Users = mongoose.model('users', usersSchema, 'users');
module.exports = Users