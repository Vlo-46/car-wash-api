'use strict';
const data = require('../utils/seedData')
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', data.users);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
