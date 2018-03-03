const config = require('../config');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const validate = require('express-validation');
const expressWinston = require('express-winston');
const helmet = require('helmet');
const HttpStatus = require('http-status');
const over = require('method-override');
const logger = require('morgan');
const winston = require('./Winston');
const APIError = require('../lib/APIError');
const routes = require('../routes');
const register = require('babel-core/register');

const app = express();

if (config.env === 'development') {
  app.use(logger('development'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(compression());
app.use(over());
// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance: winston,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}

// mount all routes on / path
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const e = new APIError(HttpStatus.NOT_FOUND);
  return next(e);
});

// error converter
app.use((err, req, res, next) => {
  if (err instanceof validate.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const msg = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const e = new APIError(HttpStatus.BAD_REQUEST, `${msg}`);
    return next(e);
  } else if (!(err instanceof APIError)) {
    const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const e = new APIError(status, err.message);
    return next(e);
  }
  return next(err);
});

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance: winston
  }));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {
  const status = err.status;
  const msg = err.message || HttpStatus[status];
  if (config.env === 'development') {
    return res.status(status).json({
      message: msg,
      stack: err.stack
    });
  }
  return res.status(status).json({
    message: msg
  });
});

module.exports = app;
