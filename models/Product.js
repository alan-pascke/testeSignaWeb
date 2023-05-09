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
        required: true
    },
    sku_order: {
        type: DataTypes.CHAR,
        required: true
    },
    title: {
        type: DataTypes.CHAR,
        required: true
    },
    value: {
        type: DataTypes.FLOAT,
        required: true
    },
    stock: {
        type: DataTypes.INTEGER,
        required: true
    },
});

module.exports = Product