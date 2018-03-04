var https = require('https');
var request = require('request-promise');

exports.authorize = function(req, res, next) {
  console.log('checking authentications');
  const token = req.headers['access-token'];
  const uid = req.headers['uid'];
}
