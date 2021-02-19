var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
/*var formidableMiddleware = require('express-formidable');*/

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var courseRouter = require('./routes/course');
var studentRouter = require('./routes/student');
var enrollmentRouter = require('./routes/enrollment');

var app = express();
//database
const { mongoose }= require("./db");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser());

/*app.use(formidableMiddleware({
  encoding: 'utf-8',
  uploadDir: './public/images',
  multiples: true, // req.files to be arrays of files
}));*/
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/api', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/course', courseRouter);
app.use('/api/student', studentRouter);
app.use('/api/enrollment', enrollmentRouter);

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
