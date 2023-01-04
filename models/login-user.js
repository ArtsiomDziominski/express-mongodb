const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginUserSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const LoginUser = mongoose.model('Users', loginUserSchema);

module.exports = LoginUser;