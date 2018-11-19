var Event = require('../models/Event.model');
var User = require('../models/User.model');
var callbacks = require('./callbacks');
var done = callbacks.done;
var jdone = callbacks.jdone;

exports.getEvent = function(req, res, next) {
  Event.findOne({ _id: req.params.id }, function(err, event) {
    if (err) {
      console.log(err);
      res.status(500).send('That event does not exist in the database');
    } else {
      res.json(event);
    }
  });
};

// Create an event, logs to server console
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
      res.status(500).send("There was an error creating this event");
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

exports.addGeocode = function(req, res) {
  console.log(req.body);
  Event.update({ _id: req.params.id }, { $set: { geocode: req.body.geocode }}, function(err, event) {
    if (err) console.log(err);
    else res.status(200).send('Geocode added successfully');
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

// returns events hosted by currently logged in user
exports.hostedEvents = function(req, res) {
  Event.find({ host: req.params.id }).lean().sort({ date: 1 }).exec(function(err, events) {
    if (err) {
      console.log(err);
      res.status(500).send('Events could not be found');
    } else {
      res.json(events);
    }
  });
};

exports.getAll = function(req, res) {
  Event.find({}, 'name -_id').lean().exec(function(err, events) {
    if (err) {
      console.log(err);
      res.status(500).send('There was an error gettings events');
    } else {
      res.json(events);
    }
  });
};

// allows guest to sign up for event. 
exports.guestSignUp = function(req, res) {
  Event.find({ _id: req.body.event_id }, { $push: { attendees: req.body.name }}, function(err, event) {
    if (err) res.status(500).send('There was a problem registering guest');
    else {
      console.log(event);
      res.send('Guest successfully registered');
    }
  });
};

// search for events by name and location. Just add documents to the array to search for other parameters (like VENUE)
exports.eventSearchName = function(req, res) {
  if (!req.body.name) res.status(404);
  var rgx = new RegExp(req.body.name, 'i');
  Event.find({ $or: [{ name: rgx }, { location: rgx }] }, function(err, events) {
    if (err) {
      console.log('error retrieving event');
      res.status(500).send('There was an error');
    }
    else {
      res.json(events);
    }
  });
};