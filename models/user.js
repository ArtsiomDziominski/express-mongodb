const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const createUserSchema = new Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
}, {timestamps: true})

const User = mongoose.model('User', createUserSchema)

module.exports = User;
