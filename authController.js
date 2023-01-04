const User = require("./models/user");

class authController {
    async createUser(req, res) {
        const newUser = req.body
        const createUser = new User({login: newUser.login, password: newUser.password});
        createUser
            .save()
            .then((result) => {
                res.status(201).send(result)
            })
            .catch((e) => {
                res.status(400).send(e)
            })
    }

    async getUserName(req, res) {
        const userName = req.body.login;
        User
            .findOne({login: userName})
            .then((user) => {
                res.status(400).send(user.login)
                console.log(user)
            })
            .catch((err) => res.status(200).send(err))
    }

    async loginUser(req, res) {
        const user = req.body;
        User
            .findOne({login: user.login, password: user.password})
            .then((user) => {
                console.log(user)
                res.status(200).send(user)
            })
            .catch((err) => res.status(400).send(err))
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