'use strict';
var bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.Profile, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'Profile'
    })
  };
  User.beforeCreate(function(user, options) {
    return cryptPassword(user.password)
      .then(success => {
        user.password = success;
      })
      .catch(err => {
        if (err) console.log(err);
      });

  });

  User.getUserByName = function(username, callback) {
    User.findOne({ where: {username: username} }).then(user => {
      if(!user) throw new Error('Not able to find the user');

      callback(null, user);
    })
  }

  User.comparePassword = function(candidatepassword, hash, callback) {
    bcrypt.compare(candidatepassword,hash, function(err, isMatch) {
      if(err) throw err;
      callback(null, isMatch);
    });
  }

  User.getUserById = function(id, callback) {
    User.findById(id).then(user => {
      if(!user) throw new Error('Not able to find the user');

      callback(null, user);
    });
  }

  return User;
};

function cryptPassword(password) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return reject(err);

      bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in your password DB.
        return resolve(hash);
      });
    }); 
  });
}