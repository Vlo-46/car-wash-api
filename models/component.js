'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Component extends Model {
        static associate(models) {
            // define association here
        }
    }

    Component.init({
        device_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Component',
    });

    const CarWashDevices = sequelize.define('CarWashDevices')
    Component.belongsTo(CarWashDevices, {
        foreignKey: 'id',
        onDelete: 'cascade'
    })

    return Component;
};