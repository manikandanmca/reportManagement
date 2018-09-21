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

router.delete('/:id', function(req, res){
  models.sequelize.transaction(async () => {
    await models.Profile.destroy({ where: {userId: req.params.id}});
    await models.User.destroy({ where: {id: req.params.id}});
    res.redirect('/admin/users');  
  });
 
});

router.get('/edit/:id', function(req,res){
  models.sequelize.transaction(async () => {
    const user = await models.User.findOne({where: {id: req.params.id}, include: [{ model: models.Profile, as: 'Profile', 
                                                         include: [{model: models.Team, as: 'Team'},
                                                                   {model: models.Role, as: 'Role'}
                                                                  ] 
                                                       }] 
                                            })
                        .then(user => {
                     return user;
                  });
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
                 console.log('USER IS', user.email);
                 console.log('Team is', user.Profile.Team.name);
    res.render('admin/users/new', {user: user,roles: roles, teams: teams });
  });
});

router.put('/update/:id', function(req,res){
  console.log('sdff');
    const response  = models.sequelize.transaction(async () => {
    const user = await models.User.update({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    },{where: {id: req.params.id}})
    .then(function(user) {
      console.log(user);
    });

    //console.log("%%%%%%%%%%%%%%%%%%%%" + req.body.teams + req.body.roles);
    const profile = await models.Profile.update({
      teamId: req.body.teams,
      roleId: req.body.roles
    },{where: {id: req.params.id}})
    .then(function(profile) {
      console.log(profile);
      res.redirect('/admin/users');
    })
    
    });

  });

module.exports = router;
