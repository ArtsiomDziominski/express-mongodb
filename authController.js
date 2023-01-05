const User = require("./models/user");
const bcrypt = require('bcryptjs');
const messageServer = require("./message-server");
const immutable = require("./const");
const jwt = require("jsonwebtoken");


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
        const createUser = new User({login: newUser.login, password: hashPassword});
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

    async createPost(req, res) {
        const post = new Post({title: req.body.title, description: req.body.description});
        post
            .save()
            .then((result) => res
                .status(201)
                .send(result))
    }
}

module.exports = new authController()