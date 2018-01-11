const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const users = require('./routes/users');
const ping = require('./routes/ping');

const app = express();

//CORS middleware, Needed for cross domain requests
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //Currently allow all domains
  res.header('Access-Control-Allow-Methods', 'POST, DELETE, PUT, GET'); // Only allow POST to the serves, removed 'DELETE, PUT and GET'
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(allowCrossDomain);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/ping', ping);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.sendStatus(err.status || 500);
});

console.log("Server started");

module.exports = app;
