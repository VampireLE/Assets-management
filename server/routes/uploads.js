var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
    return res.status(200).json({'body': '213'})
})