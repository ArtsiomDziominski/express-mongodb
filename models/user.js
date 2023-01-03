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

const getUserSchema = new Schema({
    login: {
        type: String,
        required: true
    },
})

const CreateUsers = mongoose.model('User', createUserSchema)
const GetUserName = mongoose.model('Users', getUserSchema)

module.exports = CreateUsers, GetUserName;
