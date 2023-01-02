const express = require('express');
const mongoose = require("mongoose");
const Post = require("./models/post");
const bodyParser = require('body-parser');
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

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/post', urlencodedParser, function (req, res) {
    console.log(req.body)
    const post = new Post({title: req.body.title, description: req.body.description});
    post
        .save()
        .then((result) => res
            .status(201)
            .send(result))
        .catch((e) => console.log(e))
})

app.get('/', function (req, res) {
    res.send('Create Post\n Artsiom Dziominski')
})

app.listen(PORT, () => console.log('Server started on port ', PORT))