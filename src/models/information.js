var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var InformationSchema = new mongoose.Schema({
  phone: {
    type: String
  },
  email: {
    type: Number
  },
  instagram: {
    type: Number
  },
  facebook_fanpage: {
    type: String, bcrypt: true
  },
  address: {
    type: String
  }
});

var Information = module.exports = mongoose.model('Information', InformationSchema);