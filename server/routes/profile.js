const express = require('express');
const router = express.Router();
const authentificateJWT = require('../middleware/auth');;
const jwt = require('jsonwebtoken');
const Users = require('../Models/ModelUsers');

router.post('/', authentificateJWT, async (req, res, next) => {
    const token = req.body.token;
    if (!token) res.status(404).json({error: 'token is invalid'});
    const decoded = jwt.decode(token);
    const user = await Users.findById(decoded.id);
    delete user.password
    return res.status(200).json({'body': user});
})

module.exports = router;