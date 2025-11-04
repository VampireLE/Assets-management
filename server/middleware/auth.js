const jwt = require("jsonwebtoken");
const config = require("dotenv").config();
const JWT_SECRET = config.parsed.JWT_SECRET;

function authentificateJWT(req, res, next) {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) return res.status(401).json({error: 'Not a have token'});

    const token = authHeaders.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ error: 'Token expired or invalid'})
        }

        req.user = decoded;
        next();
    })
}

module.exports = authentificateJWT