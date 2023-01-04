const Router = require('express')
const router = new Router()
const controller = require('./authController')
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({extended: false})

router.post('/post')
router.post('/create-user', urlencodedParser, controller.createUser)
router.post('/get-user-name', urlencodedParser, controller.getUserName)
router.post('/login-user', urlencodedParser, controller.loginUser)

module.exports = router