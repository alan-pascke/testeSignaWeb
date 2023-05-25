const express = require('express');
const app = express();
const path = require('path')
const customerRouter = require('./routes/customerRouter');
const productRouter = require('./routes/productsRouter');
const handlebars = require('express-handlebars');
const session = require('express-session');



//Sessão
app.use(session({
  secret: '654321',
  resave: true,
  saveUninitialized: true
}))


// Public
app.use(express.static(path.join(__dirname + '/public')))

// Midleware
app.use((req, res, next) => {
  next()
})

// Configuração do body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname + '/views'));



//Rotas
app.get('/' , (req, res) => {
  res.send('Rota principal')
})

app.use('/admin', customerRouter)

app.use('/admin', productRouter)


app.listen(8081, () =>{ 
  console.log('Sevidor roadando na url http://localhost:8081')
  
});