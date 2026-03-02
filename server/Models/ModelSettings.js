const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    integration: {
        ad: Boolean,
        keycloak: Boolean
    }
})

const Settings = mongoose.model('settings', settingsSchema, 'settings');
module.exports = Settings