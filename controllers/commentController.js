const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');
const Post = require('../models/post');
require("dotenv").config()

exports.comment_create_post = function(req, res) {
    jwt.verify(req.token, process.env.secret, (err, user) => {
        if (err)
            res.sendStatus(403);
        else {
            const comment = new Comment({
                text: req.body.text,
                user_id: user,
                username: user.username
            }).save((err, comment) => {
                if (err) {
                    console.log(err)
                    res.status(409).json({message: "Failed to create comment."})
                }
                else {
                    Post.updateOne({_id: req.body.postID}, {$push: {comments: comment}}, (err, post) => {
                        console.log(err)
                        if (err) 
                            res.status(409).json({message: "Failed to update post."})
                         else {
                            res.status(200).json({post, message: "Updated post."})
                        }
                    })     
                }
        })
    }
})
}
exports.comment_delete = function(req, res) {
    // Need to verify user/ensure correct user is deleting it
    jwt.verify(req.token, process.env.secret, (err, user) => {
        if (err)
            res.sendStatus(403);
        else {
            Comment.findByIdAndDelete({_id: req.params.id}, (err, comment) => {
                if (err) {
                    res.status(409).json({message: "Failed to delete comment."})
                }
                if (comment === null) {
                    res.status(404).json({message: "Failed to find comment."})
                }
                else {
                    res.status(200).json({message: "Comment deleted.", comment})
                }
            })
        }
    })
};

