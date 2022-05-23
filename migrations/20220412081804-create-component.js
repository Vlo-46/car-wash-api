'use strict';
const constants = require('../utils/constants')
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Components', {
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
            name_am: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            name_ru: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            name_en: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            value: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('Components');
    }
};
