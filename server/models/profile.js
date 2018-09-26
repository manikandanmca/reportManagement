'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    userId: DataTypes.STRING,
    teamId: DataTypes.STRING,
    roleId: DataTypes.STRING
  }, {});
  Profile.associate = function(models) {
    // associations can be defined here
    Profile.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'User'
    });

    Profile.belongsTo(models.Team, {
      foreignKey: 'teamId',
      onDelete: 'CASCADE',
      as: 'Team'
    });

    Profile.belongsTo(models.Role, {
      foreignKey: 'roleId',
      onDelete: 'CASCADE',
      as: 'Role'
    });

  };
  return Profile;
};