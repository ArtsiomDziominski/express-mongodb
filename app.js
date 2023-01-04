const express = require('express');
const mongoose = require("mongoose");
const Post = require("./models/post");
const bodyParser = require('body-parser');
const CreateUsers = require("./models/user");
const GetUsersName = require("./models/user");
const app = express();
const PORT = 2000;

const DB_URL = '';

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials: true');
    res.header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    next();
});

mongoose.connect(DB_URL, {useNewUrlParser: true, UseUnifiedTopology: true})
    .then(() => console.log('Connected to db!'));

const urlencodedParser = bodyParser.urlencoded({extended: false})

app.get('/', function (req, res) {
    res.send('Create Post\n Artsiom Dziominski')
})

app.post('/post', urlencodedParser, function (req, res) {
    const post = new Post({title: req.body.title, description: req.body.description});
    post
        .save()
        .then((result) => res
            .status(201)
            .send(result))
})

app.post('/create-user', urlencodedParser, function (req, res) {
    const createUser = new CreateUsers({login: req.body.login, password: req.body.password});
    createUser
        .save()
        .then((result) => {
            res.status(201).send(result)
        })
        .catch((e) => {
            res.status(400).send(e)
        })
})

app.post('/get-user-name', urlencodedParser, function (req, res) {
    const userName = req.body.login;
    GetUsersName
        .findOne({login: userName})
        .then((user) => {
            res.status(400).send(user.login)
            console.log(user)
        })
        .catch((err) => res.status(200).send(err))
})

app.post('/login-user', urlencodedParser, function (req, res) {
    const user = req.body;
    GetUsersName
        .findOne({login: user.login, password: user.password})
        .then((user) => {
            console.log(user)
            res.status(200).send(user)
        })
        .catch((err) => res.status(400).send(err))
})

app.listen(PORT, () => console.log('Server started on port ', PORT))