var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var CategorySchema = new mongoose.Schema({
  title: {
    type: String
  },
  titleUrl: {
    type: Number
  },
  parent_id: {
    type: Schema.ObjectId
  }
});

var Category = module.exports = mongoose.model('Category', CategorySchema);