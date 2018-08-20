var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/user.controller');

router.get('/', user_controller.getUser);

router.delete('/:id', user_controller.deleteUser);

module.exports = router;