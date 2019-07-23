var express = require('express')
var http = require('http')
var app = express()
 
app.get('/', (req, res) => {
  res.status(200).send("Bienvenido")
})
 
http.createServer(app).listen(8001, () => {
  console.log('Server started at http://localhost:8001');
});


var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({limit:'10mb'}))
 
app.get('/secure', (req, res) => {
  var token = req.headers['authorization']
  if(!token){
      res.status(401).send({
        error: "Es necesario el token de autenticación"
      })
      return
  }

  token = token.replace('Bearer ', '')

  jwt.verify(token, 'Secret Password', function(err, user) {
    if (err) {
      res.status(401).send({
        error: 'Token inválido'
      })
    } else {
      res.send({
        message: 'OK'
      })
    }
  })
})



const usuario = require('./rutas/rutaUsuario');
app.use('/usuario', usuario);

const mongoose = require('mongoose');
let dev_db_url = 'mongodb://someuser:abcd1234@ds123619.mlab.com:23619/productstutorial';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


