var express = require('express');
const Assets = require('./../Models/ModelAssets');
var router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const count = await Assets.countDocuments()
        const accessories = await Assets.find({}).skip(req.query.page === 1 ? 0 : (req.query.page -1) * req.query.count).limit(req.query.count);
        res.json({data: accessories, page: Math.ceil(count / req.query.count)});
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

router.patch('/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const updated = await Assets.findByIdAndUpdate({_id: id}, req.body, {new: true});

        if (!updated) {
            return res.status(404).json({message: 'Asset not found'})
        }

        res.status(200).json({ message: 'OK', data: updated })
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