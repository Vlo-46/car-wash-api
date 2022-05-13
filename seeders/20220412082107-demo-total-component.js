'use strict';
const data = require('../utils/seedData')
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('TotalComponents', data.totalComponents);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('TotalComponents', null, {});
  }
};
