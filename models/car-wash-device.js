'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CarWashDevice extends Model {
        static associate(models) {
            // define association here
        }
    }

    CarWashDevice.init({
        technician_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        car_wash_point_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'CarWashDevices',
    });

    const CarWashPoints = sequelize.define('CarWashPoints')
    CarWashDevice.belongsTo(CarWashPoints, {
        // foreignKey: 'car_wash_device_id'
        foreignKey: 'id'
    })

    const DeviceSettings = sequelize.define('DeviceSettings')
    CarWashDevice.hasOne(DeviceSettings, {
        foreignKey: 'device_id',
        // onDelete: 'CASCADE'
    })

    const Counter = sequelize.define('Counter')
    CarWashDevice.hasOne(Counter, {
        foreignKey: 'device_id',
        // onDelete: 'CASCADE'
    })

    return CarWashDevice;
};