var express = require('express');
const { user_create_post, user_login_post, user_logout_post } = require('../controllers/userController');
var router = express.Router();

router.post('/', user_create_post);

router.post('/login', user_login_post);

router.post('/logout', user_logout_post);

module.exports = router;

