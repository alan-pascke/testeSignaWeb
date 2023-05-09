const express = require('express');
const app = express();

const Custumer = require('./models/Custumer');
const Product = require('./models/Product');
const sequelize  = require('./database/db');

async function createDatabase() {
  try {

    sequelize.authenticate().then(()=>{
      console.log("Conectado com sucesso");
  }).catch((erro)=>{
      console.log('Falha ao se conectar' + erro);
  })

    // Sincroniza os modelos com o banco de dados
    await sequelize.sync({ force: true });
    console.log('Tabelas criadas com sucesso.');

    // Cria um usuário de exemplo
    await Custumer.create({
      name: 'Exemplo',
      email: 'exemplo@example.com',
      cpf: '123456789101'
    });
    console.log('Usuário criado com sucesso.');


    // Cria um usuário de exemplo
    await Product.create({
        sku_order: 'teste',
        title: 'teste',
        value: 20,
        stock: 3
      });
      console.log('produto criado com sucesso.');

    // Encerre a conexão com o banco de dados
    await sequelize.close();
    console.log('Conexão encerrada.');
  } catch (error) {
    console.error('Erro ao criar o banco de dados:', error);
  }
}

createDatabase();

app.listen(5432, () =>{ 
    console.log('Sevidor roadando na url http://localhost:5432')
});