var express = require('express');
const { comment_delete, comment_create_post } = require('../controllers/commentController');
const verifyToken = require('../shared/verify');
var router = express.Router();
require("dotenv").config()

router.post('/', verifyToken, comment_create_post);

router.delete('/:id', verifyToken, comment_delete);

module.exports = router;


