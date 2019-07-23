const Usuario = require('../modelo/usuario');
var jwt = require('jsonwebtoken')

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.crearUsuario = function (req, res) {
    let usuario = new Usuario(
        {
            username: req.body.user,
            password: req.body.password
        }
    );

    usuario.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Usuario creado satisfactoriamente')
    })
};

exports.identificarUsuario = function (req, res) {
  var username = req.body.user
  var password = req.body.password
 
  if( !(username === 'oscar' && password === '1234')){
    res.status(401).send({
      error: 'usuario o contraseña inválidos'
    })
    return
  }
 
  var tokenData = {
    username: username
    // ANY DATA
  }
 
  var token = jwt.sign(tokenData, 'Secret Password', {
     expiresIn: 60 * 60 * 24 // expira en 24 horas
  })
 
  res.send({
    token
  })
};

