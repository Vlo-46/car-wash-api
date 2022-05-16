'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Counter extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Counter.init({
        device_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        coinT: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        coinD: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        billT: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        billD: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        cashlessT: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        cashlessD: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        bonusT: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        bonusD: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        serviceT: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        serviceD: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        chSpent: {
            type: DataTypes.STRING(1234),
            defaultValue: "{t: 0, d: 0}",
            allowNull: false
        },
        chTimePaidMode: {
            type: DataTypes.STRING(1234),
            defaultValue: "{t: 0, d: 0}",
            allowNull: false
        },
        chTimeFreeMode: {
            type: DataTypes.STRING(1234),
            defaultValue: "{t: 0, d: 0}",
            allowNull: false
        },
        powerOnTime: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Counter',
    });

    const DeviceSettings = sequelize.define('DeviceSettings')
    Counter.belongsTo(DeviceSettings, {
        foreignKey: 'id',
        onDelete: 'cascade'
    })

    const CarWashDevices = sequelize.define('CarWashDevices')
    Counter.belongsTo(CarWashDevices, {
        foreignKey: 'id',
        onDelete: 'cascade'
    })

    return Counter;
};