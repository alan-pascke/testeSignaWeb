const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');


const Product = sequelize.define('products', {
    id_order: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date_of_order: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true
    },
    sku_order: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    title: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
});

module.exports = Product