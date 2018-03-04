var https = require('https');
var request = require('request-promise');
var mongoose = require('mongoose');
var Article = require('../models/article');

exports.create = function(req, res, next) {
  var art = new Article({
    content: '1234',
    title: '234234'
  });
  Article.createArticle(art, function(err, article) {
    if (err) throw err;
    res.send(article);
  })
}
