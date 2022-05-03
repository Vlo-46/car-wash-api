'use strict';
const constants = require('../utils/constants')
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Counters', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            device_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            coinT: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            coinD: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            billT: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            billD: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            cashlessT: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            cashlessD: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            bonusT: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            bonusD: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            serviceT: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            serviceD: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            chSpent: {
                type: Sequelize.STRING(1234),
                defaultValue: "{t: 0, d: 0}",
                allowNull: false
            },
            chTimePaidMode: {
                type: Sequelize.STRING(1234),
                defaultValue: "{t: 0, d: 0}",
                allowNull: false
            },
            chTimeFreeMode: {
                type: Sequelize.STRING(1234),
                defaultValue: "{t: 0, d: 0}",
                allowNull: false
            },
            powerOnTime: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
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
        await queryInterface.dropTable('Counters');
    }
};
