var express = require('express');
var router = express.Router();

var event_controller = require('../controllers/event.controller');

// Event create, read, update, destroy
router.get('/:id', event_controller.getEvent);

router.post('/', event_controller.createEvent);

router.put('/', event_controller.updateEvent);

router.delete('/:id', event_controller.deleteEvent);

module.exports = router;

// Need routes to add and remove users from event/waitlist