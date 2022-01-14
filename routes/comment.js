var express = require('express');
const { comment_delete, comment_create_post } = require('../controllers/commentController');
const verifyToken = require('../shared/verify');
var router = express.Router();
require("dotenv").config()

/* GET home page. */
router.post('/', comment_create_post);

router.delete('/:id', verifyToken, comment_delete);

module.exports = router;


// exports.comment_create_post = function(req, res) {
//   const comment = new Comment({
//       text: req.params.text,
//       user: jwt.verify(req.token, process.env.secret, (err, authData) => {
//           if (err)
//               res.sendStatus(403);
//           else {
//               return authData;
//           }
//       })
//   }).save((err, comment) => {
//       if (err) {
//           res.status(409).json({message: "Failed to create comment."})
//       }
//         res.status(201).json({message: "comment created.", comment})
//   })
// };

// exports.comment_delete = function(req, res) {
//   // Need to verify user/ensure correct user is deleting it
//   jwt.verify(req.token, process.env.secret, (err, authData) => {
//       if (err)
//           res.sendStatus(403);
//       else {
//           Comment.findByIdAndDelete({_id: req.params.id}, (err, comment) => {
//               if (err) {
//                   res.status(409).json({message: "Failed to delete comment."})
//                 }
//                 res.status(200).json({message: "Post deleted.", comment})
//           })
//       }
//   })
// };
