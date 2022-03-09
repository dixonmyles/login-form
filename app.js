const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local');
const path = require('path');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

const User = require('./Models/userModel');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

// Database Connection
mongoose.connect('mongodb://localhost/node-mongodb');
const conn = mongoose.connection;
conn.on('connected', () => {
  console.log('Successfully connected to the database');
});
conn.on('disconnected', () => {
  console.log('Successfully disconnected from the database');
});
conn.on('error', () => {
  console.error.bind(console, 'Connection Error');
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  require('express-session')({
    secret: 'node js mongodb',
    resave: false,
    saveUninitialized: false,
  }),
);

// Passport Strategy
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true,
  }),
);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);

module.exports = app;
