'use strict';
const {Model} = require('sequelize');

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