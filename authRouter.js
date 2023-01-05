const Router = require('express')
const router = new Router()
const controller = require('./authController')
const bodyParser = require("body-parser");
const authMiddleware = require("./authMiddleware")

const urlencodedParser = bodyParser.urlencoded({extended: false})

router.post('/post')
router.post('/create-user', urlencodedParser, controller.createUser)
router.post('/login-user', urlencodedParser, controller.loginUser)
router.post('/update-user-contacts', authMiddleware, urlencodedParser, controller.updateUserContacts)

module.exports = router