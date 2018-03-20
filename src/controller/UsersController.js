var https = require('https');
var request = require('request-promise');
var mongoose = require('mongoose');
var User = require('../models/user');

exports.list = function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) throw err;
    res.send(users);
  })
}

exports.create = function(req, res, next) {
  var art = new User(req.body.user);
  art.save(function(err, user) {
    if (err) throw err;
    res.send(user);
  })
}

exports.show = function(req, res, next) {
  const query= {_id: req.params.id};
  User.findOne(query, function(err, users) {
    if (err) throw err;
    res.send(users);
  })
}

exports.edit = function(req, res, next) {
  const newObj = req.body.user;
  User.findByIdAndUpdate(req.params.id, newObj, {new: true}, function(err, user) {
    if (err) throw err;
    res.send(user);
  })
}


exports.destroy = function(req, res, next) {
  const query= {_id: req.params.id};
  User.remove(query, function(err, user) {
    if (err) throw err;
    res.send(user);
  })
}

