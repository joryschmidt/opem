var Event = require('../models/Event.model');
var User = require('../models/User.model');

exports.getEvent = function(req, res, next) {
  Event.findOne({ _id: req.params.id }, function(err, event) {
    if (err) {
      console.log(err);
      res.status(500).send('That event does not exist in the database');
    } else {
      console.log(event);
      res.json(event);
    }
  });
};

exports.createEvent = function(req, res, next) {
  var newEvent = new Event();
  
  newEvent.name = req.body.name;
  newEvent.date = req.body.date;
  newEvent.time_start = req.body.time_start;
  newEvent.location = req.body.location;
  
  if (req.body.time_end) newEvent.time_end = req.body.time_end;
  if (req.body.description) newEvent.description = req.body.description;
  if (req.body.recurring) newEvent.recurring = req.body.recurring;
  if (req.body.requestable) newEvent.requestable = req.body.requestable;
  
  newEvent.signup_date = req.body.signup_date;
  newEvent.signup_start = req.body.signup_start;
  newEvent.signup_end = req.body.signup_end;
  newEvent.host = req.body.host;
  newEvent.spots = Number(req.body.spots);
  newEvent.attendees = [];
  newEvent.waitlist = [];
  
  newEvent.save(function(err, event) {
    if (err) {
      console.log(err.message);
      res.send("There was an error creating this event");
    }
    else {
      console.log('Event successfully saved');
      User.update({ _id: req.body.host }, { $push: { hosted_events: event._id }}, function(err, response) {
        if (err) console.log(err);
        else {
          console.log('Event added to users hosted events');
          console.log(response);
        }
      });
      
      res.json(event);
    }
  });
};

exports.updateEvent = function(req, res) {
  Event.update({ _id: req.body.id }, {
    $set: {
      date: req.body.date,
      signup_date: req.body.signup_date,
      time_start: req.body.time_start,
      signup_start: req.body.signup_start,
      time_end: req.body.time_end,
      signup_end: req.body.signup_end,
      location: req.body.location,
      description: req.body.description,
      host: req.body.host,
      attendees: req.body.attendees,
      waitlist: req.body.waitlist,
      spots: req.body.spots,
      recurring: req.body.recurring,
      requestable: req.body.requestable
    }
  }, function(err, event) {
    if (err) {
      console.log(err);
      res.status(500).send('Event could not be updated');
    } else {
      console.log(event);
      res.json(event);
    }
  });
};

exports.deleteEvent = function(req, res) {
  Event.findOneAndRemove({ _id: req.params.id }, function(err, event) {
    if (err) {
      console.log(err);
      res.status(500).send('Event could not be deleted');
    } else {
      console.log(event);
      res.status(200).send('Event has been deleted');
    }
  });
};

exports.hostedEvents = function(req, res) {
  Event.find({ host: req.params.id }).sort({ date: 1 }).exec(function(err, events) {
    if (err) {
      console.log(err);
      res.status(500).send('Events could not be found');
    } else {
      console.log(events);
      res.json(events);
    }
  });
};