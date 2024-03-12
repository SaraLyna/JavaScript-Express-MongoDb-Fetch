var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');


const indexRouter = require('./routes/index.route');
const accessRouter = require('./routes/access.route');
const userRouter = require('./routes/user.route');

const errorMiddleware = require('./middlewares/error.middleware');
const dbConnection = require('./controllers/db.controller.js');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/access', accessRouter);
app.use('/user', userRouter);

app.use(errorMiddleware);


module.exports = app;
