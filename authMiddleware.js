const messageServer = require("./message-server");
const jwt = require("jsonwebtoken");
const {secret} = require("./config")

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            return res.status(403).send(messageServer.USER_NOT_AUTH)
        }
        req.user = jwt.verify(token, secret)
        next()
    } catch (e) {
        return res.status(403).send(messageServer.USER_NOT_AUTH)
    }
}