const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize( process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres'
    }
  );

  sequelize.authenticate().then(()=>{
    console.log("Conectado com sucesso");
    }).catch((erro)=>{
        console.log('Falha ao se conectar' + erro);
    })


module.exports = sequelize
