const jwt = require("jsonwebtoken");
const config = require("dotenv").config();
const JWT_SECRET = config.parsed.JWT_SECRET;

function authentificateJWT(req, send, next) {
    
    const authHeaders = req.header.authorisation;
    if (!authHeaders) return send.status(401).json({error: 'Not a have token'});

    const token = authHeaders.split(' ')[1];

    jwt.verify
}

module.exports = authentificateJWT