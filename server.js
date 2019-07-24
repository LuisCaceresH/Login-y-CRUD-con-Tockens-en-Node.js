var express = require('express')
var http = require('http')
var app = express()
var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
 
app.get('/', (req, res) => {
  res.status(200).send("Bienvenido")
})
 
http.createServer(app).listen(8001, () => {
  console.log('Server started at http://localhost:8001');
});

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({limit:'10mb'}))
 

const usuario = require('./rutas/rutaUsuario');
app.use('/usuario', usuario);

