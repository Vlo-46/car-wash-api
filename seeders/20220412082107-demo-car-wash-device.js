'use strict';
const data = require('../utils/seedData')
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('CarWashDevices', data.carWashDevices);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('CarWashDevices', null, {});
  }
};
