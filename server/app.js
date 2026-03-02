const JWT_SECRET = require('dotenv').config();
const express = require('express');
const historyRouter = require('./routes/history');
const dashboardRouter = require('./routes/dashboard');
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const assetsRouter = require('./routes/assets');
const licencesRouter = require('./routes/licences');
const accessoriesRouter = require('./routes/accessories');
const componentsRouter = require('./routes/components');
const usersRouter = require('./routes/users');
const profileRouter = require('./routes/profile');  
const settingsRouter = require('./routes/settings');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

try {
  mongoose.connect("mongodb://root:password@mongo:27017/Assets_management?authSource=admin")
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', authRouter);
app.use('/profile', profileRouter);
app.use('/dashboard', dashboardRouter);
app.use('/history', historyRouter);
app.use('/assets', assetsRouter);
app.use('/licences', licencesRouter);
app.use('/accessories', accessoriesRouter);
app.use('/components', componentsRouter)
app.use('/users', usersRouter);
app.use('/settings', settingsRouter);
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
