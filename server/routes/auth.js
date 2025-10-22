var express = require('express');
const Users = require('./../Models/ModelUsers');
const authentificateJWT = require('../middleware/auth');
var router = express.Router();


// router.get('/', async (req, res, next) => {
// })

router.post('/', authentificateJWT, async (req, res, next) => {
    const {email, password} = req.body;
})

module.exports = router