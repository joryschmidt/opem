var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/user.controller');


router.post('/signup', user_controller.signup);

router.post('/login', user_controller.login);

router.get('/logout', user_controller.logout);

module.exports = router;