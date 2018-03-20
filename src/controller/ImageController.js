var mongoose = require('mongoose');

exports.create = function(req, res, next) {
  var link = req.files[0].filename
  res.send({
    link
  });
}

exports.destroy = function(req, res, next) {
  var link = req.files[0].filename
  res.send({
    link
  });
}
