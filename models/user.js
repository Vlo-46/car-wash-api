'use strict';
const {Model} = require('sequelize');
const constants = require('../utils/constants')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here
        }
    }

    User.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        role: {
            type: DataTypes.ENUM,
            values: [constants.userTypes.ADMIN, constants.userTypes.TECHNICIAN, constants.userTypes.USER],
            defaultValue: constants.userTypes.USER,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        firstLogin: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        sequelize,
        modelName: 'User',
    });

    const CarWashPoints = sequelize.define('CarWashPoints')

    User.hasOne(CarWashPoints, {
        foreignKey: 'user_id',
        as: 'user_info'
    })

    User.hasOne(CarWashPoints, {
        foreignKey: 'technician_id',
        as: 'technician_info'
    })

    User.hasMany(CarWashPoints, {
        foreignKey: 'user_id',
        as: 'user_points',
        onDelete: 'cascade'
    })

    User.hasMany(CarWashPoints, {
        foreignKey: 'technician_id',
        as: 'technician_points',
        onDelete: 'cascade'
    })

    const Technic_users = sequelize.define('Technic_users')
    User.hasMany(Technic_users, {
        foreignKey: 'technician_id',
        as: 'technician_user',
        onDelete: 'cascade'
    })

    return User;
};