var express = require('express');
const Assets = require('../Models/ModelLicences');
var router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const count = await Assets.countDocuments()
        const accessories = await Assets.find({}).skip(req.query.page === 1 ? 0 : (req.query.page -1) * 5).limit(5);
        res.json({data: accessories, page: Math.ceil(count / 5)});
    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

module.exports = router;