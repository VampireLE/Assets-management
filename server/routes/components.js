var express = require('express');
const authentificateJWT = require('../middleware/auth');
const Components = require('../Models/ModelComponents');
var router = express.Router();

router.get('/', authentificateJWT,  async (req, res, next) => {
    try {
        const components = new Components();
        components.findAll();
    } catch (err) {
        return res.status(401).json({error: err.message})
    }
})

router.get('/count', authentificateJWT,  async (req, res, next) => {
    try {
        const components = await Components.countDocuments();
        res.status(200).json({data: components});
    } catch (err) {
        return res.status(401).json({error: err.message})
    }
})

module.exports = router;