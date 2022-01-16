var express = require('express');
const { post_list_get, post_detail_get, post_create_post, post_edit_put, post_publish_post } = require('../controllers/postController');
const verifyToken = require('../shared/verify');
var router = express.Router();

router.get('/', post_list_get);

router.get('/:id', post_detail_get);

router.post('/', verifyToken, post_create_post);

router.post('/publish/:id', verifyToken, post_publish_post);


router.put('/:id', verifyToken, post_edit_put);


module.exports = router;

