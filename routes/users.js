var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('users/login');
});

router.get('/register', function(req, res, next) {
  res.render('users/register');
});

router.post('/register', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/home', function(req, res, next) {
  res.render('users/home');
});

module.exports = router;
