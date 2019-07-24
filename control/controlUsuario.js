const usuario = require('../modelo/usuario');
var jwt = require('jsonwebtoken')

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Funciona!');
};


exports.identificarUsuario = function (req, res) {
  var {username, password} = req.body;
  if(usuario.validarUsuario(username, password)){
    var tokenData = {
        username: username
        // ANY DATA
    }
    var token = jwt.sign(tokenData, password, {
        expiresIn: 60 * 60 * 24 // expira en 24 horas
    })
    res.send(token);
  }else{
      res.send('El usuario no existe');
  }
}; 

exports.crearUsuario = function (req, res) {
    var {username, password, nombres, apellidos} = req.body;
    if(usuario.agregarUsuario(username, password, nombres, apellidos) === 1){
        res.send("Usuario agregado");
    }else{
        res.send("No se pudo agregar usuario");
    }
};

exports.modificarUsuario = function (req, res){
    var {username, password, nombres, apellidos} = req.body;
    usuario.editarUsuario(username, password, nombres, apellidos)
    .then (respuesta =>{
        console.log(respuesta);
        if(respuesta ===1){
            res.status(200).send("Usuario modificado");
        }else{
            res.status(401).send("No se pudo modificar usuario");
        }
    });
};

exports.eliminarUsuario = function (req, res){
    var {username} = req.body;
    if(usuario.eliminarUsuario(username) === 1){
        res.status(200).send("Usuario eliminado");
    }else{
        res.status(401).send("No se pudo eliminar usuario");
    }
};

exports.listarUsuarios = async function (req, res){
    res.status(200).send("Usuarios listados: "+usuario.listarUsuarios());
};

exports.mostrarUsuario = async function (req, res){
    var {username} = req.body;
    res.status(200).send("Usuario "+username+": "+usuario.mostrarUsuario(username));
}
//   if( !(username === 'oscar' && password === '1234')){
//     res.status(401).send({
//       error: 'usuario o contraseña inválidos'
//     })
//     return
//   }
 
//   var tokenData = {
//     username: username
//     // ANY DATA
//   }
 
//   var token = jwt.sign(tokenData, 'Secret Password', {
//      expiresIn: 60 * 60 * 24 // expira en 24 horas
//   })
 
//   res.send({
//     token
//   })



// app.get('/secure', (req, res) => {
//     var token = req.headers['authorization']
//     if(!token){
//         res.status(401).send({
//           error: "Es necesario el token de autenticación"
//         })
//         return
//     }
  
//     token = token.replace('Bearer ', '')
  
//     jwt.verify(token, 'Secret Password', function(err, user) {
//       if (err) {
//         res.status(401).send({
//           error: 'Token inválido'
//         })
//       } else {
//         res.send({
//           message: 'OK'
//         })
//       }
//     })
//   })
  

