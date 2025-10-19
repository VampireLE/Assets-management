var express = require('express');
const Assets = require('./../Models/ModelUsers');
var router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let { q, page=1 } = req.query;
        let filter = {};
        let limit = 5;
        let skip = (req.query.page === 1 ? 0 : (req.query.page -1) * limit)
        if (q && q.trim !== '') {
            filter = {name: { $regex: q, $options: 'i' }};
        }
        
        let count = await Assets.countDocuments();
        let accessories = await Assets.find(filter).skip(skip).limit(limit);
        console.log(accessories)

        res.json({data: accessories, page: Math.ceil(count / 5)});
    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

module.exports = router;