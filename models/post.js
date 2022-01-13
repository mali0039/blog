
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { SchemaTypes } = require("mongoose")


const Post = mongoose.model('Post', new Schema({
    timestamp: {type: Date, default: Date.now, required: true},
    text: {type: String, required: true},
    author: {type: SchemaTypes.ObjectId, required: true, ref: "User"},
    comments: [{type: SchemaTypes.ObjectId, ref: "Comment"}],
    title: {type: String, required: true},
    published: {type: Boolean, required: true}
}))

module.exports = Post