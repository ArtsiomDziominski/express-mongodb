const express = require('express');
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

const DB_URL = '';
mongoose.connect(DB_URL, {useNewUrlParser: true, UseUnifiedTopology: true})
    .then(() => console.log('Connected to db!'));

app.get('/post', (req, res) => {
    res.status(200).json()
})

app.get('/', function (req, res) {
    res.send('Create Post\n Artsiom Dziominski')
})

app.listen(PORT, () => console.log('Server started on port ', PORT))