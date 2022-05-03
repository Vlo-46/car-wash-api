'use strict';
const data = require('../utils/seedData')
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Counters', data.counters);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Counters', null, {});
  }
};
