var express = require('express');
const Assets = require('../Models/ModelLicences');
const Licences = require('../Models/ModelLicences');
const authentificateJWT = require('../middleware/auth');
var router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const count = await Licences.countDocuments()
        const accessories = await Licences.find({}).skip(req.query.page === 1 ? 0 : (req.query.page -1) * 5).limit(5);
        res.json({data: accessories, page: Math.ceil(count / 5)});
    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

router.get('/count', authentificateJWT, async (req, res, next) => {
    try {
        const count = await Licences.countDocuments()
        res.status(200).json({data: count});
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

module.exports = router;