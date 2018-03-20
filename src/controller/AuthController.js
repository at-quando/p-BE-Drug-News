var https = require('https');
var request = require('request-promise');

exports.authorize = function(req, res, next) {
  try {
    console.log('checking authentications');
    const token = req.headers['access-token'];
    const uid = req.headers['uid'];
    if (token === 'undefined' || uid === 'undefined') throw 'can not get any data for authorized';
    Auth.findOne({uid: uid}, function(err, auth) {
      if (err) throw err;
      if (!auth) throw 'auth is not exist';
      if (auth.access_token !== token) throw "Token not matched";
      User.findOne({_id: auth.user_id},{name: 1, avatar: 1}, function(err, person) {
        if (err) throw err;
        var user = new UserSerialized(person.name, person.avatar, auth.provider);
        res.locals.user = user;
        res.locals.header = {token: token, uid: uid, user_id: person.id};
        console.log('auth ok');
        next();
      });
    });
  } catch (e) {
    res.status(404).send({});
  }
}

exports.login = function(req, res, next) {
  console.log('checking authentications');
  const token = req.headers['access-token'];
  const uid = req.headers['uid'];
}

exports.logout = function(req, res, next) {
  console.log('checking authentications');
  const token = req.headers['access-token'];
  const uid = req.headers['uid'];
}