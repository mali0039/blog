const Comment = require('../models/comment');
const jwt = require('jsonwebtoken')

exports.comment_create_post = function(req, res) {
    const comment = new Comment({
        text: req.params.text,
        user: jwt.verify(req.token, "secret", (err, authData) => {
            if (err)
                res.sendStatus(403);
            else {
                return authData;
            }
        })
    }).save((err, comment) => {
        if (err) {
            res.status(409).json({message: "Failed to create comment."})
        }
          res.status(201).json({message: "comment created.", comment})
    })
};

exports.comment_delete = function(req, res) {

    Comment.findByIdAndDelete({_id: req.params.id}, (err, comment) => {
        if (err) {
            res.status(409).json({message: "Failed to delete comment."})
          }
          res.status(200).json({message: "Post deleted.", comment})
    })
};

