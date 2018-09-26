var express = require('express');
var router = express.Router();
var models = require('../../models/index');
/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  console.log(req.user.dataValues.username);
  res.render('admin/home', { title: 'Express' });
});

function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
  	return next();
  } else {
  	res.redirect('/users/login');
  }

}
module.exports = router;