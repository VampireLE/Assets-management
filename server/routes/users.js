var express = require('express');
const authentificateJWT = require('../middleware/auth');
const Users = require('./../Models/ModelUsers');
var router = express.Router();

router.get('/count', authentificateJWT, async (req, res, next) => {
    try {
        const users = await Users.countDocuments();
        return res.status(201).json({data: users});
    } catch (err) {
        res.status(404).json({error: "Not found records"})
    }
});

router.get('/', authentificateJWT, async (req, res, next) => {
    try {
        const users = await Users.find({});
        return res.status(201).json({data: users});
    } catch (err) {
        res.status(404).json({error: "Not found records"})
    }
});



router.get('/count/local', authentificateJWT, async (req, res, next) => {
    try {
        const users = await Users.countDocuments();
        return res.status(201).json({data: users});
    } catch (err) {
        res.status(404).json({error: "Not found records"})
    }
});

// router.get('/users?...', authentificateJWT, async (req, res, next) => {
    // try {
    //     let { q, page=1 } = req.query;
    //     let filter = {};
    //     let limit = 5;
    //     let skip = (req.query.page === 1 ? 0 : (req.query.page -1) * limit)
    //     if (q && q.trim !== '') {
    //         filter = {name: { $regex: q, $options: 'i' }};
    //     }
        
    //     let count = await Assets.countDocuments();
    //     let accessories = await Assets.find(filter).skip(skip).limit(limit);

    //     res.json({data: accessories, page: Math.ceil(count / 5)});
    // } catch (err) {
    //     res.status(500).json({error: err.message})
    // }
// })

module.exports = router;