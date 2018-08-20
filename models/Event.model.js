var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpotSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  name: {
    type: String
  },
  spot: {
    type: Number
  },
  special_requests: {
    type: String
  }
});

var EventSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  time_start: {
    type: Date,
    required: true
  },
  time_end: {
    type: Date
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  hosted_by: { type: Schema.ObjectId, ref: 'User', required: true },
  attendees: [SpotSchema],
  waitlist: [SpotSchema],
  spots: {
    type: Number
  },
  recurring: {
    type: Number
  }
});

module.exports = mongoose.model('Event', EventSchema);