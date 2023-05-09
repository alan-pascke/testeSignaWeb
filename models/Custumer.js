const { DataTypes } = require('sequelize');
const sequelize  = require('../database/db');

const Custumer = sequelize.define('custumers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.CHAR,
        required: true
    },
    email: {
        type: DataTypes.CHAR,
        required: true
    },
    cpf: {
        type: DataTypes.CHAR,
        required: true
    },
});

module.exports = Custumer
