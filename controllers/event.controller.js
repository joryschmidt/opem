var Event = require('../models/Event.model');

exports.getEvent = function(req, res, next) {
  Event.findOne({ _id: req.params.id }, function(err, event) {
    if (err) {
      console.log(err);
      res.status(500).send('That event does not exist in the database');
    else {
      console.log(event);
      res.json(event);
    }
  });
};

exports.createEvent = function(req, res) {
  var newEvent = new Event();
  
  newEvent.date = req.body.date;
  newEvent.time_start = req.body.time_start;
  newEvent.location = req.body.location;
  
  if (req.body.time_end) newEvent.time_end = req.body.time_end;
  if (req.body.description) newEvent.description = req.body.description;
  
  newEvent.host = req.body.host;
  newEvent.spots = req.body.spots;
  newEvent.attendees = [];
  newEvent.waitlist = [];
  // if (recurring) newEvent.recurring = req.body.recurring;
  // else newEvent.recurring = 0;
  
  newEvent.save(function(err, event) {
    if (err) {
      console.log(err);
      res.send("There was an error creating this event");
    }
    else {
      console.log(event);
      res.json(null);
      next();
    }
  });
};

exports.updateEvent = function(req, res) {
  Event.update({ _id: req.body.id }, {
    $set: {
      date: req.body.date;
      time_start: req.body.time_start;
      time_end: req.body.time_end;
      location: req.body.location;
      description: req.body.description;
      host: req.body.host;
      attendees: req.body.attendees;
      waitlist: req.body.waitlist;;
      spots: req.body.spots;
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