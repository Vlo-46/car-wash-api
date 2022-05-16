'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Technic_users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Technic_users.init({
        technician_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Technic_users',
    });

    const User = sequelize.define('User')
    Technic_users.belongsTo(User, {
        foreignKey: 'id',
        onDelete: 'cascade'
    })

    return Technic_users;
};