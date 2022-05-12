'use strict';
const data = require('../utils/seedData')
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Components', data.components);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Components', null, {});
  }
};
