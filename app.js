var createError = require('http-errors');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

//move this to a separate file later and don't hardcore the address
//var database = require('.database/database');
let mongoose = require('mongoose');
const database = () => {
	mongoose.connect('mongodb://moball:123456a@ds047335.mlab.com:47335/gbc-blogapp-db')
		.then(() => { console.log(`Connected to mongodb`)})
		.catch(err => { console.log(err)});
};//end database stuff

database();

var app = express();

// Set layout
app.set('layout', 'layout')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
