const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Customer = require('./Customer');
const Product = require('./Product');

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

Order.belongsTo(Customer);
Order.belongsTo(Product);

module.exports = Order