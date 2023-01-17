const User = require("./models/user");
const Post = require("./models/post");
const bcrypt = require('bcryptjs');
const messageServer = require("./message-server");
const immutable = require("./const");
const jwt = require("jsonwebtoken");
const {secret} = require("./config")


const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: "48h"})
}

class authController {
    async createUser(req, res) {
        const newUser = req.body;
        if (newUser.login.length <= immutable.LOGIN_LENGTH) {
            return res.status(400).send(`${messageServer.INVALID_LOGIN} ${immutable.LOGIN_LENGTH} символов`)
        } else if (newUser.password.length <= immutable.PASSWORD_LENGTH) {
            return res.status(400).send(`${messageServer.INVALID_PASSWORD} ${immutable.PASSWORD_LENGTH} символов`)
        }
        const candidate = await User.findOne({login: newUser.login})
        if (candidate) {
            return res.status(400).send(messageServer.USER_REPEAT)
        }
        const hashPassword = bcrypt.hashSync(newUser.password, 3);
        const createUser = new User({login: newUser.login, password: hashPassword, phone: ' ', mail: ' '});
        createUser
            .save()
            .then(() => {
                return res.status(201).send(messageServer.REGISTRATION_ACCEPT)
            })
            .catch((e) => {
                return res.status(400).send(e)
            })
    }

    async loginUser(req, res) {
        const userLogin = req.body;
        User
            .findOne({login: userLogin.login})
            .then((user) => {
                const validPassword = bcrypt.compareSync(userLogin.password, user.password);
                const token = generateAccessToken(user._id);
                return validPassword ?
                    res.status(200).send({loginAccept: messageServer.LOGIN_ACCEPT, jwt: token}) :
                    res.status(400).send(messageServer.PASSWORD_ERROR)
            })
            .catch(() => res.status(400).send(messageServer.LOGIN_ERROR))
    }

    async updateUserContacts(req, res) {
        const user = {
            id: req.user.id,
            phone: req.body.phone,
            mail: req.body.mail,
        }

        User.findByIdAndUpdate({_id: user.id}, {phone: user.phone, mail: user.mail})
            .then((result) => {
                return res.status(200).send(result)
            })
    }

    async getUser(req, res) {
        const user = {
            id: req.user.id,
        }

        User.findById({_id: user.id})
            .then((result) => {
                const userResult = {
                    id:result._id,
                    login: result.login,
                    mail: result.mail,
                    phone: result.phone,
                }
                return res.status(200).send(userResult)
            })
            .catch((err) => {
                return res.status(400).send(err)
            })
    }

    async createPost(req, res) {
        const bodyPost = req.body;
        const post = new Post({title: bodyPost.title, description: bodyPost.description, author: bodyPost.author});
        post
            .save()
            .then((result) => {
                return res.status(201).send(result)
            })
            .catch((err) => {
                return res.status(400).send(err)
            })
    }

    async getPosts(req, res) {
        Post
            .find()
            .then((allPosts) => {
                return res.status(200).send(allPosts)
            })
            .catch((err) => {
                return res.status(400).send(err)
            })
    }

    async getPost(req, res) {
        const id = req.body.id;
        Post
            .findById(id)
            .then((post) => {
                return res.status(200).send(post)
            })
            .catch((err) => {
                return res.status(400).send(err)
            })
    }

    async updatePost(req, res) {
        const postUpdate = req.body;

        Post.findByIdAndUpdate({_id: post.id}, postUpdate)
            .then((result) => {
                return res.status(200).send(result)
            })
            .catch((err) => {
                return res.status(400).send(err)
            })
    }

    async deletePost(req, res) {
        const post = {
            id: req.body.id,
        }

        Post.findByIdAndDelete({_id: post.id})
            .then((result) => {
                return res.status(200).send(result)
            })
            .catch((err) => {
                return res.status(400).send(err)
            })
    }
}

module.exports = new authController()