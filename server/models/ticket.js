'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    activity: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.INTEGER,
    status: DataTypes.STRING,
    comments: DataTypes.STRING,
    teamReportId: DataTypes.INTEGER
  }, {});
  Ticket.associate = function(models) {
    // associations can be defined here
  };
  return Ticket;
};