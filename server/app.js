const JWT_SECRET = require('dotenv').config();
var express = require('express');
var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var assetsRouter = require('./routes/assets');
var licencesRouter = require('./routes/licences');
var accessoriesRouter = require('./routes/accessories');
var usersRouter = require('./routes/users');
const mongoose = require('mongoose');
var cors = require('cors');

try {
  mongoose.connect("mongodb://root:password@localhost:27017/Assets_management?authSource=admin")
  .then(() => console.log('connect'))
  .catch((err) => console.log(err))
} catch (error) {
  console.log(error)
}

var app = express();
app.use(cors({
  origin: true
}))
app.use(express.json());

// Подключаем только существующие роутеры
app.use('/', authRouter);
app.use('/assets', assetsRouter);
app.use('/licences', licencesRouter);
app.use('/accessories', accessoriesRouter);
app.use('/users', usersRouter);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

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
