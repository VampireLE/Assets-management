const Users = require('../Models/ModelUsers');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

async function createAdmin() {
    await mongoose.connect('mongodb://root:password@mongo:27017/Assets_management?authSource=admin')
    .then(() => console.log("Connected"))
    .catch(() => console.log("Could not connect"))

    const hashPassword = await bcrypt.hash('Admin123', 10)
    
    try {
        await Users.create({
            icon: "path",
            name: 'admin',
            surname: "admin",
            email: 'admin@test.ru',
            role: 'admin',
            status: 'active',
            number: "+71234567890",
            language: "ru",
            password: hashPassword
        })
        console.log('user was create successfully')
        process.exit(1)
    } catch (error) {
        console.log('Error: ' + error.message)
        process.exit(1)
    }

    // const exists = await Users.findOne({email:'test@test.ru'});
    // if (exists) {
    //     console.log('User exists');
    //     return
    // }
    // console.log('User not found')
}

createAdmin()