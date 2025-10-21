const jwt = require("jsonwebtoken");
const JWT_SECRET = require("dotenv").config();

function authentificateJWT(req, send, next) {
    console.log(req.headers)

}

module.exports = authentificateJWT