
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { SchemaTypes } = require("mongoose")


const User = mongoose.model('User', new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    fullName: {type: String, required: true},
    username: { type: String, required: true },
    password: { type: String, required: true },
    isAuthor: {type: Boolean, required: true}
}))

module.exports = User