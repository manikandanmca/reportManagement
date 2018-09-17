'use strict';
module.exports = (sequelize, DataTypes) => {
  const TeamReport = sequelize.define('TeamReport', {
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    reportId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER
  }, {});
  TeamReport.associate = function(models) {
    // associations can be defined here
    TeamReport.belongsTo(models.Report);
    TeamReport.belongsTo(models.Team);
  };
  return TeamReport;
};