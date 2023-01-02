const express = require('express');
const app = express();
const PORT = 3000;

app.get('/post', (req,res)=> {
    res.status(200).json()
})

app.get('/', function (req, res) {
    res.send('Create Post\n Artsiom Dziominski')
})

app.listen(PORT, () => console.log('Server started on port ', PORT))