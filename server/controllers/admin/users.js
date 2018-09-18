var express = require('express');
var router = express.Router();
var models = require('../../models/index');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
/* GET users listing. */

router.get('/', function(req, res, next) {
  const response  = models.sequelize.transaction(async () => {
    const users = await models.User.findAll({ include: [{ model: models.Profile, as: 'Profile', 
                                                         include: [{model: models.Team, as: 'Team'},
                                                                   {model: models.Role, as: 'Role'}
                                                                  ] 
                                                       }] 
                                            })
                  .then(users => {
                   /* console.log(JSON.stringify(users[0].Profile.Team));
                    const allUsers = [];
                    users.forEach(function(user) {
                      
                      allUsers << ({ id: user.id,
                                    name: user.name,
                                    email: user.email,
                                    username: user.username,
                                    pssword: user.password,
                                    role: user.Profile == undefined ? 'Admin' : user.Profile.Role.name,
                                    team: user.Profile == undefined ? 'Admin' : user.Profile.Team.name
                                  })
                      
                    }); */

                    res.render('admin/users/index',{ users: users});
                  });
  });
});

router.get('/new', function(req, res, next) {
 const response  = models.sequelize.transaction(async () => {
   const teams = await models.Team.findAll({attributes: ['id','name','status']})
                 .then(teams => { 
                    var listOfTeams = [];
                    teams.forEach(function(team) {
                      listOfTeams.push(team.dataValues)
                    });
                    return listOfTeams;
                 });
   const roles = await models.Role.findAll({attributes: ['id','name']})
                 .then(roles => { 
                    var listOfRoles = [];
                    roles.forEach(function(role) {
                      listOfRoles.push(role.dataValues)
                    });
                    return listOfRoles;
                 });
   res.render('admin/users/new', {roles: roles, teams: teams});
 });

});

router.post('/', function(req, res, next) {
  const response  = models.sequelize.transaction(async () => {
    const user = await models.User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    .then(function(newUser) {
      return newUser;
    });
    user.createProfile({teamId: req.body.teams, roleId: req.body.roles})
      .then(function(profile) {
        res.redirect('/admin/users');  
    })

  });

});



module.exports = router;
