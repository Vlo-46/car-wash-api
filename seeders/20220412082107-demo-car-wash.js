'use strict';
const data = require('../utils/seedData')
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('CarWashPoints', data.carWashPoints);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('CarWashPoints', null, {});
  }
};
