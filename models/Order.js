const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Order = sequelize.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date_order: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true
    },
})

module.exports = Order