const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const jsonRouter = require("./routes/json");
const error = require('./routes/error');
const taskRouter = require('./routes/taskRouter');


const app = express();


mongoose.connect('mongodb://localhost/tasksBase')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/task', taskRouter);
app.use('/todo', express.static(path.join(__dirname, 'public/todo.html')));
app.use("/json", jsonRouter);
app.use(error);


module.exports = app;
