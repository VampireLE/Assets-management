var express = require('express');
const Assets = require('./../Models/ModelAccessories');
const Accessories = require('./../Models/ModelAccessories');
const authentificateJWT = require('../middleware/auth');
const History = require('../Models/ModelHistory');
var router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const queryCount = req.query.count;
        const history = await History.find({}).limit(queryCount);
        res.json({data: history})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

module.exports = router;