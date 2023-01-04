const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const createUserSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {timestamps: true})

const CreateUsers = mongoose.model('User', createUserSchema)

module.exports = CreateUsers;
