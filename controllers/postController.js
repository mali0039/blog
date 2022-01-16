const Post = require('../models/post');
require("dotenv").config()
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.post_list_get = function (req, res) {
    Post.find().populate("author").populate("comments").exec((err, posts) => {
        if (err) {
            res.status(404).json({ message: "Failed to retrieve posts." })
        }
        res.status(200).json({ posts, message: "Retrieved all posts." })
    })
};

exports.post_detail_get = function (req, res) {
    Post.findById({ _id: req.params.id }).populate("comments").exec((err, post) => {
        if (err) {
            res.status(404).json({ message: "Failed to retrieve post." })
        }
        else {
            res.status(200).json({ post, message: "Retrieved specific post." })
        }
    })
};

exports.post_create_post = function (req, res) {
    jwt.verify(req.token, process.env.secret, (err, user) => {
        if (err)
            res.sendStatus(403);
        else {
            if (user.isAuthor === true) {
                const post = new Post({
                    text: req.body.text,
                    author: user._id,
                    title: req.body.title,
                    published: req.body.publish
                }).save((err, post) => {
                    if (err) {
                        console.log(err)
                        res.status(409).json({ message: "Failed to create post." })
                    }
                    else {
                        res.status(201).json({ message: "Post created.", post })
                    }
                })
            }
            else {
                res.status(403).json({ message: "Not an author." });
            }
        }
    })

}

exports.post_edit_put = function (req, res) {
    jwt.verify(req.token, process.env.secret, (err, authData) => {
        if (err)
            res.sendStatus(403);
        else {
            let update = {}
            if (req.body.title) {
                title = req.body.title;
                update.title = title;
            }
            if (req.body.text) {
                text = req.body.text;
                update.text = text;
            }
            console.log(update)
            Post.findByIdAndUpdate(req.params.id, update, (err, post) => {
                if (err) {
                    res.status(409).json({ message: "Failed to update post." })
                }
                else {
                    res.status(200).json({ post })
                }
            })
        }
    })

};

exports.post_publish_post = function (req, res) {
    jwt.verify(req.token, process.env.secret, (err, authData) => {
        if (err)
            res.sendStatus(403);
        else {
            Post.findByIdAndUpdate(req.params.id, { published: true }, (err, post) => {
                if (err) {
                    res.status(409).json({ message: "Failed to publish post." })
                }
                else {
                    res.status(200).json({ post, messag: "Post successfully published." })
                }
            })
        }
    })

};

