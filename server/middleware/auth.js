const jwt = require("jsonwebtoken");
const config = require("dotenv").config();
const JWT_SECRET = config.parsed.JWT_SECRET;

function authentificateJWT(req, send, next) {
    if (!req.headers.authorization) return res.status(401).json({error: "Not found token"})
    const [schema, token] = (req.headers.authorization).split(' ');
    
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        req.user = {id: payload.userId}
    })

    // console.log(req.headers.authorization)
    // next();
    return 
}

module.exports = authentificateJWT