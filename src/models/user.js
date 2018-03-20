var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  email: {
    type: String
  },
  phone: {
    type: Number
  },
  name: {
    type: String
  },
  password: {
    type: String, bcrypt: true
  },
  access_token: {
    type: String
  },
  confirm_send_at: {
    type: Date
  },
  confirm_token: {
    type: String
  },
  confirm_at: {
    type: Date
  }
});

var User= module.exports = mongoose.model('User', UserSchema);

module.exports.createAuth = function (user, callback) {
  if(user.password) {
    bcrypt.hash(user.password, 10,function(err,hash){
      if(err) throw err;
      user.password = hash;
      user.save(callback);
    });
  }
  else {
    user.save(callback);
  }
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword,hash,function(err, isMatch){
    if(err) return callback(err);
    callback(null,isMatch);
  });
}

module.exports.createAccessToken = function(user, callback) {
  require('crypto').randomBytes(48, function(err, buffer) {
    const query = { 'access_token': buffer.toString('hex')};
    User.findByIdAndUpdate(user._id, query, {new: true}, callback)
  });
}