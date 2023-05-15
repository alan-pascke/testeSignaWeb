const express = require('express');
const app = express();
const path = require('path')
const admin = require('./routes/admin');
const handlebars = require('express-handlebars');

// //Sessão
// app.use(sesion({
//   secret: '654321',
//   resave: true,
//   saveUninitialized: true
// }))


// Public
app.use(express.static(path.join(__dirname + 'public')))

// Midleware
app.use((req, res, next) => {
  next()
})

// Configuração do body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');



//Rotas
app.get('/' , (req, res) => {
  res.send('Rota principal')
})

app.use('/admin', admin)


app.listen(8081, () =>{ 
  console.log('Sevidor roadando na url http://localhost:8081')
  
});