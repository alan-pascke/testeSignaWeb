const Sequelize = require('sequelize');


const sequelize = new Sequelize('loja_signo', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres'
})




module.exports = sequelize
