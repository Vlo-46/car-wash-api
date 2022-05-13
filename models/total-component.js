'use strict';
const {Model} = require('sequelize');
const constants = require('../utils/constants')

module.exports = (sequelize, DataTypes) => {
    class TotalComponent extends Model {
        static associate(models) {
            // define association here
        }
    }

    TotalComponent.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    }, {
        sequelize,
        modelName: 'TotalComponent',
    });

    return TotalComponent;
};