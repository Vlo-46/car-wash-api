'use strict';
const data = require('../utils/seedData')
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('DeviceSettings', data.deviceSettings);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('DeviceSettings', null, {});
    }
};
