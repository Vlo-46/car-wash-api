'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('CarWashDevices', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            technician_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            car_wash_point_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            name: {
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
        await queryInterface.dropTable('CarWashDevices');
    }
};
