'use strict';
const constants = require('../utils/constants')
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('CarWashPoints', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            car_wash_point_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            technician_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            token: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('CarWashPoints');
    }
};
