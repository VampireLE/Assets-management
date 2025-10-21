const Users = require('../Models/ModelUsers');
const bcrypt = require('bcrypt');

async function createAdmin() {
    const hashPassword = await bcrypt.hash('Admin123', 10)
    
    try {
        await Users.create({
            name: 'admin',
            email: 'admin@test.ru',
            role: 'admin',
            status: 'active',
            password: hashPassword
        })
        console.log('user was create successfully')
    } catch (error) {
        console.log('Error: ' + error.message)
    }

    // const exists = await Users.findOne({email:'test@test.ru'});
    // if (exists) {
    //     console.log('User exists');
    //     return
    // }
    // console.log('User not found')
}

createAdmin()