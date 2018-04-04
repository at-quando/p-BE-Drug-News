var https = require('https');
var request = require('request-promise');
var mongoose = require('mongoose');
var Category = require('../models/category');

exports.list = function(req, res, next) {
  Category.find({}, function(err, categories) {
    if (err) throw err;
    res.send(categories);
  })
}

exports.create = function(req, res, next) {
  console.log(req.body);
  let newCategory = req.body;
  Category.find({
    "title": req.body.title,
  }, function(err, category){
    console.log("length:" + category.length);
    if(!err){
      if(category == 0) {
        Category.create(newCategory, function(err, success){
          if(err) throw err;
          if(success) res.send(newCategory);
        })
      }
    }
    if(category != 0){
      res.send("Exist");
    }
  })
}

exports.show = function(req, res, next) {
  const query= {_id: req.params.id};
  Category.findOne(query, function(err, categories) {
    if (err) throw err;
    res.send(categories);
  })
}

exports.edit = function(req, res, next) {
  const newObj = req.body.category;
  Category.findByIdAndUpdate(req.params.id, newObj, {new: true}, function(err, category) {
    if (err) throw err;
    res.send(category);
  })
}


exports.destroy = function(req, res, next) {
  const query= {_id: req.params.id};
  Category.remove(query, function(err, category) {
    if (err) throw err;
    res.send(category);
  })
}

