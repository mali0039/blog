const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { SchemaTypes } = require("mongoose")


const Comment = mongoose.model('Comment', new Schema({
    timestamp: {type: Date, default: Date.now, required: true},
    text: {type: String, required: true},
    user_id: {type: SchemaTypes.ObjectId, required: true, ref: "User"}
}))

module.exports = Comment