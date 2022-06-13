'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CarWashPoints extends Model {
        static associate(models) {
            // define association here
        }
    }

    CarWashPoints.init({
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        car_wash_point_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        technician_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'CarWashPoints',
    });

    const User = sequelize.define('User')
    // CarWashPoints.hasOne(User, {
    //     foreignKey: 'id',
    //     as: 'user_info'
    // })
    //
    // CarWashPoints.belongsTo(User, {
    //     foreignKey: 'id',
    //     as: 'technician_info'
    // })

    CarWashPoints.belongsTo(User, {
        foreignKey: 'id',
        onDelete: 'cascade'
    })

    const CarWashDevice = sequelize.define('CarWashDevices')
    CarWashPoints.hasMany(CarWashDevice, {
        foreignKey: 'car_wash_point_id',
        onDelete: 'cascade'
    })

    return CarWashPoints;
};