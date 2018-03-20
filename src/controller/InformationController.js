var https = require('https');
var request = require('request-promise');
var mongoose = require('mongoose');
var Information = require('../models/information');

exports.create = function(req, res, next) {
  var art = new Information(req.body.information);
  art.save(function(err, information) {
    if (err) throw err;
    res.send(information);
  })
}

exports.show = function(req, res, next) {
  const query= {_id: req.params.id};
  Information.findOne(query, function(err, information) {
    if (err) throw err;
    res.send(information);
  })
}

exports.edit = function(req, res, next) {
  const newObj = req.body.information;
  Information.findByIdAndUpdate(req.params.id, newObj, {new: true}, function(err, information) {
    if (err) throw err;
    res.send(information);
  })
}


exports.destroy = function(req, res, next) {
  const query= {_id: req.params.id};
  Information.remove(query, function(err, information) {
    if (err) throw err;
    res.send(information);
  })
}

