'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Teams', [{
        name: 'Client - Apps',
        status: true
      }, {
        name: 'BN - Cloud',
        status: true
      }, {
        name: 'Analytics BI & CI',
        status: false
      }, {
        name: 'Analytics - Client Services',
        status: true
      },{
        name: 'QuickPub',
        status: true
      },
      {
        name: 'Devices',
        status: true
      },
      {
        name: 'QA - Team',
        status: true
      },
      {
        name: 'Payment Gateway',
        status: false
      },{
        name: 'Build & Release',
        status: false
      }

      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
      return queryInterface.bulkDelete('Team', null, {});
    
  }
};
