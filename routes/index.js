const express = require('express');
const path = require('path');

const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login');
}

/* GET home page. */
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/secret', isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/secret.html'));
});

module.exports = router;
