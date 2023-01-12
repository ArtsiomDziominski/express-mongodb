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
router.get('/get-user', authMiddleware, urlencodedParser, controller.getUser)
router.post('/create-post', authMiddleware, urlencodedParser, controller.createPost)
router.get('/get-posts', urlencodedParser, controller.getPosts)
router.post('/get-post', urlencodedParser, controller.getPost)
router.post('/update-post', urlencodedParser, controller.updatePost)
router.post('/delete-post', urlencodedParser, controller.deletePost)

module.exports = router