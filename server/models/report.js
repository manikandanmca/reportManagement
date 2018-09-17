'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    name: DataTypes.STRING,
    month: DataTypes.DATE,
    status: DataTypes.INTEGER
  }, {});
  Report.associate = function(models) {
    // associations can be defined here
    Report.hasMany(models.TeamReport, {
      foreginKey: 'reportId'	
    });
  };
  return Report;
};