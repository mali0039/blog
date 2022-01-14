const Post = require('../models/post');

exports.post_list_get = function (req, res) {
    Post.find().populate("author").populate("comments").exec((err, posts) => {
        if (err) {
            res.status(404).json({ message: "Failed to retrieve posts." })
        }
        res.status(200).json({ posts })
    })
};

exports.post_detail_get = function (req, res) {
    Post.findById({ _id: req.params.id }, (err, post) => {
        if (err) {
            res.status(404).json({ message: "Failed to retrieve post." })
        }
        res.status(200).json({ post })
    })
};

exports.post_create_post = function (req, res) {
    jwt.verify(req.token, process.env.secret, (err, authData) => {
        if (err)
            res.sendStatus(403);
        else {
            const post = new Post({
                text: req.params.text,
                author: req.params.author,
                title: req.params.title,
                published: req.params.publish
            }).save((err, post) => {
                if (err) {
                    res.status(409).json({ message: "Failed to create post." })
                }
                res.status(201).json({ message: "Post created.", post })
            })
        }
    })

};

exports.post_edit_put = function (req, res) {
    jwt.verify(req.token, process.env.secret, (err, authData) => {
        if (err)
            res.sendStatus(403);
        else {
            const title = "";
            const text = "";
            const update = {}
            if (req.params.title) {
                title = req.params.title;
                update.title = title;
            }
            if (req.params.text) {
                text = req.params.text;
                update.text = text;
            }
            Post.findByIdAndUpdate({ _id: req.params.id }, { update }, (err, post) => {
                if (err) {
                    res.status(409).json({ message: "Failed to update post." })
                }
                res.status(200).json({ post })
            })
        }
    })

};

exports.post_publish_post = function (req, res) {
    jwt.verify(req.token, "secret", (err, authData) => {
        if (err)
            res.sendStatus(403);
        else {
            Post.findByIdAndUpdate({ _id: req.params.id }, { published: true }, (err, post) => {
                if (err) {
                    res.status(409).json({ message: "Failed to publish post." })
                }
                res.status(200).json({ post })
            })
        }
    })
    
};

