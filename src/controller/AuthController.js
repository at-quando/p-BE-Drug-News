var https = require('https');
var request = require('request-promise');
var User = require('../models/user');
var UserSerialized = require('../serialized/User');

exports.authorize = function(req, res, next) {
  try {
    console.log('checking authentications');
    const token = req.headers['access-token'];
    const uid = req.headers['uid'];
    if (token === 'undefined' || uid === 'undefined') throw 'can not get any data for authorized';
    User.findOne({email: email}, function(err, auth) {
      if (err) throw err;
      if (!auth) throw 'auth is not exist';
      if (auth.access_token !== token) throw "Token not matched";
        var user = new UserSerialized(auth.name, auth._id, auth._email);
        res.locals.user = user;
        res.locals.header = {token: token, uid: uid, user_id:  user._id};
        console.log('auth ok');
        next();
    });
  } catch (e) {
    res.status(404).send({});
  }
}

exports.login = function(req, res, next) {
  User.findOne({email: req.body.email}, function (err, auth) {
    if(err) throw err;
    if(auth) {
      User.comparePassword(req.body.password, auth.password, function(err,isMatch){
        if(err) throw err;
        console.log(isMatch);
        if(isMatch) {
          User.createAccessToken(auth, function(err, authwAccessToken){
            res.set({
              'access-token': authwAccessToken.access_token,
              'uid': authwAccessToken._id
            });
            console.log(12234, auth);
            var user = new UserSerialized(auth.name, auth._id, auth.email);
            res.send({
              user
            })
          })
        } 
      });
    }
  })
}

exports.show = function(req, res, next) {
  user = res.locals.user;
  header = res.locals.header;
  res.set({
   'access-token': header.token,
   'uid': header.uid
  });
  res.status(200).send({
    user
  })
}

exports.logout = function(req, res, next) {
  const token = req.headers['access-token'];
  const uid = req.headers['uid'];
  if(token && uid) {
    User.updateOne({_id: uid}, {access_token: null}, function(err, result) {
      if (err) throw err;
      res.status(200).send();
    });
  }
}