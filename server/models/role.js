'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
    Role.hasMany(models.Profile, {
      foreignKey: 'roleId',
      onDelete: 'CASCADE',
      as: 'Profiles'
    })
  };
  return Role;
};