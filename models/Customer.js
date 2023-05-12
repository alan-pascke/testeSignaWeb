const { DataTypes } = require('sequelize');
const sequelize  = require('../database/db');

const Customer = sequelize.define('customers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    email: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    cpf: {
        type: DataTypes.CHAR,
        allowNull: false
    },
});

module.exports = Customer
