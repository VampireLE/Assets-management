var express = require('express');
const Assets = require('./../Models/ModelAssets');
const authentificateJWT = require('../middleware/auth');
var router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const QRCode = require('qrcode')

const upload = multer({dest: 'uploads/'});

router.get('/', authentificateJWT,  async (req, res, next) => {
    try {
        const count = await Assets.countDocuments()
        const accessories = await Assets.find({}).skip(req.query.page === 1 ? 0 : (req.query.page -1) * req.query.count).limit(req.query.count);
        res.json({data: accessories, page: Math.ceil(count / req.query.count)});
    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

router.get('/status', async (req, res, next) => {
    try {
        const status = await Assets.aggregate([{
            $group: {
                _id: "$status",
                count: {$sum: 1}
            }
        }])
        res.json(status)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

router.get('/count', authentificateJWT,  async (req, res, next) => {
    try {
        const count = await Assets.countDocuments();
        res.status(200).json({data: count});
    } catch (err) {
        res.status(404).json({error: "Not found record count"})
    }
})

router.post('/', upload.single('icon'), async (req, res, next) => {
    // const asset = await Assets();
    // asset.save()
    try {
        const qr = await QRCode.toDataURL('https://assets/id/123')

        console.log(qr)
        console.log(123)
        // const qrData = JSON.stringify({
        //     id: req.body.id,
        //     type: 'asset',
        //     url: `${proccess.env.FRONTEND_URL}/assets${req.body.id}`,
        //     timestamp: Date.now()
        // })

        // const options = {
        //     errorCorrectionLevel: 'H',
        //     margin: 1,
        //     width: parseInt(size),
        //     color: {
        //         dark: '#000000',
        //         light: '#ffffff'
        //     }
        // }

        // const qrSvg = await QRCode.toString(qrData, {
        //     ...options,
        //     type: 'svg',
        // });

        // res.setHeader('Content-Type', 'image/svg+xml');
        // res.send(qrData);




        const file = req.file ? req.file.filename : '';
    
        const data = req.body
        data['icon'] = file
        const asset = await Assets(data);
        asset.save()
        res.status(200).json({ message: 'Request received', body: req.file });
    } catch (err) {
        res.status(503).json({ message: 'Dont can save ' + err.message });
    }
    
});

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