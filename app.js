// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require("express-session");
var passport = require("passport");
var fileStore = require("session-file-store")(session);
var Authenticate = require("./authenticate");
var auth = require("./auth");
var verify = require("./verify");
var cors = require("cors");

const url = "mongodb://localhost:27017/CollegeComparison";
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true
});

connect.then(
  db => {
    console.log("Connected to mongodb server");
  },
  err => {
    console.log(err);
  }
);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var collegeRouter = require('./routes/college');
var uploadRouter = require("./routes/upload");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    name: "session-id",
    secret: "secret-key",
    saveUninitialized: false,
    resave: false,
    store: new fileStore()
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('*', cors({
  origin: 'http://localhost:5501',
  credentials: true
}));

// function auth(req, res, next) {
//   console.log(req.user);
//   if (!req.user) {
//     let err = new Error("You are not authenticated!");
//     err.status = 403;
//     return next(err);
//   } else {
//     next();
//   } 
// }


app.use('*', cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use(auth.user);
app.use('/college', collegeRouter);

app.use("/upload", uploadRouter);


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
