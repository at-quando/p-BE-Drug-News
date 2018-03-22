var https = require('https');
var request = require('request-promise');
var mongoose = require('mongoose');
var Article = require('../models/article');

exports.list = function(req, res, next) {
  Article.find({}, function(err, articles) {
    if (err) throw err;
    res.send(articles);
  })
}

exports.create = function(req, res, next) {
  console.log(123213, req.body.article);
  var art = new Article(req.body.article);
  art.save(function(err, article) {
    if (err) throw err;
    res.send(article);
  })
}

exports.show = function(req, res, next) {
  const query= {_id: req.params.id};
  Article.findOne(query, function(err, article) {
    if (err) throw err;
    res.send(article);
  })
}

exports.edit = function(req, res, next) {
  const newObj = req.body.article;
  Article.findByIdAndUpdate(req.params.id, newObj, {new: true}, function(err, article) {
    if (err) throw err;
    res.send(article);
  })
}


exports.destroy = function(req, res, next) {
  const query= {_id: req.params.id};
  Article.remove(query, function(err, article) {
    if (err) throw err;
    res.send(article);
  })
}

