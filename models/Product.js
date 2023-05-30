const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');


const Product = sequelize.define('products', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    sku_product: {
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