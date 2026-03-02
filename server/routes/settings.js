var express = require('express');
const authentificateJWT = require('../middleware/auth');
const Settings = require('../Models/ModelSettings');
var router = express.Router();

router.get('/integration', async (req, res, next) => {
    try {
        const settings = await Settings.find({});
        return res.status(200).json({'body': settings});
    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

router.patch('/integration/keycloak', async (req, res, next) => {
    try {
        const key = req.body;
        return res.status(200).json({key})
        // const settings = await Settings.findOneAndUpdate(key, {
        //     ad: 
        // })
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

module.exports = router;