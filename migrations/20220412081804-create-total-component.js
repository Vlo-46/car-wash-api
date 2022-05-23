'use strict';
const constants = require('../utils/constants')
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('TotalComponents', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name_am: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            name_ru: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            name_en: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
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
        await queryInterface.dropTable('TotalComponents');
    }
};
