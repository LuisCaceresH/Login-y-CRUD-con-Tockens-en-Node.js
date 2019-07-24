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

