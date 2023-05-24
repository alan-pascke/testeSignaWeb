const express = require('express');
const app = express();
const path = require('path')
const admin = require('./routes/admin');
const handlebars = require('express-handlebars');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');


//Sessão
app.use(session({
  secret: '654321',
  resave: true,
  saveUninitialized: true
}))

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  next()
})


// Public
app.use(express.static(path.join(__dirname + '/public')))

// Midleware
app.use((req, res, next) => {
  next()
})

// Configuração do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname + '/views'));



//Rotas
app.get('/' , (req, res) => {
  res.send('Rota principal')
})

app.use('/admin', admin)


app.listen(8081, () =>{ 
  console.log('Sevidor roadando na url http://localhost:8081')
  
});