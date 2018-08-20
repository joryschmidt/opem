var User = require('../models/User.model');
var bcrypt = require('bcrypt');
var md5 = require('md5');

// Register a new user
exports.signup = function(req, res, next) {
  
  var email = req.body.email;
  var hash = bcrypt.hashSync(req.body.password, 10);
  var gravatar = md5(email);
  
  var newUser = new User();
  newUser.username = req.body.username;
  newUser.email = email;
  newUser.password = hash;
  if (req.body.isAdmin) {
    newUser.admin = true;
  }
  newUser.gravatar = 'https://www.gravatar.com/avatar/' + gravatar;
  
  newUser.save(function(err, user) {
    if (err) {
      if (err.code == 11000) {
        console.log(err);
        res.status(500).send("That username or email has already been used");
      } else {
        console.log(err);
        res.send("There was an error registering user");
      }
    }
    else {
      console.log(user);
      res.json(null);
      next();
    }
  });
};

// Login a user
exports.login = function(req, res, next) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) console.log(err);
    if (!user) {
      console.log("That user doesn't seem to exist");
      res.status(401).json({ "message": "That user doesn't seem to exist." });
      next();
    } else if (bcrypt.compareSync(req.body.password, user.password)) {
      delete user.password;
      req.session.user = user;
      console.log('Login successful');
      res.status(200).json(user);
      next();
    } else {
      console.log('Wrong password mate');
      res.status(401).json({ "message": "Wrong password" });
    }
  });
};

// Logout the logged in user
exports.logout = function(req, res) {
  req.session.reset();
  console.log('Logged out');
  res.redirect('/#!/login');
};

// Get a JSON object representing the logged in user
exports.getUser = function(req, res) {
  var user = req.session.user;
  if (user) res.json(user);
  else res.status(404).json(null);
};

// Delete a user from the database
exports.deleteUser = function(req, res) {
  User.findOneAndRemove({ _id: req.params.id }, function(err, user) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      console.log(user.username, 'has been deleted');
      res.json(user);
    }
  });
};