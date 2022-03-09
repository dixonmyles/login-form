const express = require('express');
const passport = require('passport');
const path = require('path');
const User = require('../Models/userModel');

const router = express.Router();

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/register.html'));
});

// Handle User Registration
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  User.register(user, password, (err, user) => {
    if (err) {
      res.json({
        success: false,
        message: `Your account could not be created. Error: ${err}`,
      });
      return res.redirect('/register');
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/secret');
    });
  });
});

// Login Page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login',
  }),
  (req, res) => {},
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
