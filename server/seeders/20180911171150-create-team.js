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
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'BN - Cloud',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Analytics BI & CI',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Analytics - Client Services',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'QuickPub',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Devices',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'QA - Team',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Payment Gateway',
        status: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Build & Release',
        status: false,
        createdAt: new Date(),
        updatedAt: new Date()
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
