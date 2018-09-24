'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  Team.associate = function(models) {
    // associations can be defined here
     Team
        .hasMany(models.TeamReport, {
          foreginKey: 'teamId'  
        });
    Team.hasMany(models.Profile, {
          foreignKey: 'teamId',
          onDelete: 'CASCADE',
          as: 'Profiles'
        });
  };
  return Team;
};