var express = require('express');
var router = express.Router();
var models = require('../../models/index');
/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
 /* models.Report.create({
  name: 'Augest Month',
  month: new Date(),
  status: 1
  }).then(function(report) {
    models.TeamReport.create({
      name: report.name,
      reportId: report.id,
      status: true,
      teamId: 1
    }).then(function(teamreport) {
      res.json(teamreport);
    })
    
  }); */
  console.log(req.user.dataValues.username);
  res.render('admin/home', { title: 'Express' });
});

function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    //req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
  }

}
module.exports = router;