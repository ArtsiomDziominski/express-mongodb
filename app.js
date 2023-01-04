const express = require('express');
const mongoose = require("mongoose");
const authRouter = require('./authRouter')

const PORT = 2000;
const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials: true');
    res.header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    next();
});

app.use('/auth', authRouter)

const DB_URL = '';

const start = async () => {
    try {
        await mongoose.connect(DB_URL, {useNewUrlParser: true, UseUnifiedTopology: true})
            .then(() => console.log('Connected to db!'));

        app.listen(PORT, () => console.log('Server started on port ', PORT))
    } catch (e) {
        console.log(e)
    }
}

start();