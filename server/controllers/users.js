var express = require('express');
var router = express.Router();
var models = require('../models/index');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('users/login');
});

router.get('/register', function(req, res, next) {
  //res.render('users/register');
  models.User.create({
  name: 'Manikandan',
  username: 'vellimani',
    email: 'vellimani@gmail.com',
    password: 'password'
  }).then(function(user) {
    res.json(user);
  });
});

router.post('/register', function(req, res, next) {
  
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    models.User.getUserByName(username, function(err, user) {
      if (err) throw err;

      
      if(!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      models.User.comparePassword(password, user.password, function(err, isMatch) {
        if(err) throw err;

        if(isMatch) {
          return done(null, user);
        }
        else {
          return done(null, false, {message: 'Invalid password'});
        }
      });

    });

  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.User.getUserById(id, function(err, user) {
    done(err, user);
  })
});

router.post('/login',passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/users/login',
                                   failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success_msg', 'You are logged out');

  res.redirect('/users/login');
});
module.exports = router;
