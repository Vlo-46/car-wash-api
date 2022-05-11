'use strict';
const data = require('../utils/seedData')
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Technic_users', data.technic_users);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Technic_users', null, {});
  }
};
