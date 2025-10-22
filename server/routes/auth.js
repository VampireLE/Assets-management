var express = require('express');
const Users = require('./../Models/ModelUsers');
const authentificateJWT = require('../middleware/auth');
var router = express.Router();
const jwt = require('jsonwebtoken');
const config = require("dotenv").config();
const JWT_SECRET = config.parsed.JWT_SECRET;
const bcrypt = require('bcrypt');
// router.get('/', async (req, res, next) => {
// })
// authentificateJWT
router.post('/', async (req, res, next) => {
    const {email, password} = req.body;
    const user = await Users.findOne({email: email})
    if (!user) return res.status(401).json({error: "Current email not found"});

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({error: "password is not match"});

    // if (!req.headers.authorization) return res.status(401).json({error: "Not found token"})
    // const [schema, token] = (req.headers.authorization).split(' ');
    // const [userName, _] = (req.headers.user).split('@');
    // const email = req.headers.user;

    // const jwtToken = jwt.sign({
    //     username: userName,
    //     email: email
    // },
    // JWT_SECRET,
    // {
    //     expiresIn: '1h'
    // })
    // res.json({body: jwt})
})

module.exports = router