var express = require('express');
const Assets = require('./../Models/ModelAssets');
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

router.post('/', async (req, res, next) => {
    try {
        const asset = new Assets(req.body);
        await asset.save();
        res.status(201).json({ message: 'OK' })
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Assets.findByIdAndDelete(id);
        
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

module.exports = router;