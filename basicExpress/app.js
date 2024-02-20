var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
const rootRouter = require('./routes/root'); 
const errorMiddleware = require('./middlewares/error.middleware');
const rootController = require('./controllers/RootController');

app.get('/', rootController.handleRootRequest);


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
//app.use('/users', usersRouter);
app.use('/', rootRouter);
app.use(errorMiddleware); <

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

app.get('/first', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'first.html'));
});

app.get('/second', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'second.html'));
});

const jsonRouter = express.Router();
jsonRouter.get('/', (req, res) => {
    const queryParams = req.query;
    const responseData = { ...queryParams };
    responseData.date = new Date();
    res.json(responseData);
});

jsonRouter.get('/random', (req, res) => {
    const randomInt = Math.floor(Math.random() * 101); 
    const responseData = {
        randomValue: randomInt
    };
    res.json(responseData);
});

app.use('/json', jsonRouter);

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'error.html'));
});


module.exports = app;
