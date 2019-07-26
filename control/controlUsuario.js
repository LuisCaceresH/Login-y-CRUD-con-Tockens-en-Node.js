const conexionMysql = require('../database/conexion');
const jwt = require('../middleware/jwt');

exports.test = function (req, res) {
    res.send('Funciona!');
};

exports.loginUsuario = function (req, res) {
    const {username, password} = req.body;
    const query = 'CALL SP_identificar_usuario(?, ?)';
    conexionMysql.query(query, [username, password], function(error, rows){
        if(!error){
            if(rows[0][0]!=null){
                token = jwt.crearTokenUsuario(rows[0][0].username, rows[0][0].rol);
                res.send(token);
            }else{
                res.send("El usuario no existe");
            }
        }else{
            res.send(error);
        }
    })
}; 

exports.loginUsuarioAdmin = function (req, res) {
    const {username, password} = req.body;
    const query = 'CALL SP_login_usuario_admin(?, ?)';
    conexionMysql.query(query, [username, password], function(error, rows){
        if(!error){
            if(rows[0][0]!=null){
                token = jwt.crearTokenUsuario(rows[0][0].username, rows[0][0].rol);
                res.send(token);
            }else{
                res.send("El usuario no existe");
            }
        }else{
            res.send(error);
        }
    })
}; 

exports.crearUsuario = function (req, res) {
    const {username, password, nombres, apellidos, dni, rol} = req.body;
    const query = 'CALL SP_insert_usuario (?, ?, ?, ?, ?, ?)';
    const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    conexionMysql.query(query, [username, password, nombres, apellidos, dni, rol], function (error, rows){
        if(!error){
                res.json({
                status: 'success',
                code:200,
            });
        }else{
            res.send(error);
        }
    })
};

exports.cambiarContraseña =  function (req, res){
    const username = req.user.username;
    const {passActual, passNuevo} = req.body;
    const query = 'CALL SP_identificar_usuario(?, ?)';
    
    conexionMysql.query(query, [username, passActual], function(error, rows){
        if(!error){
            if(rows[0][0]!=null){
                const query2 = 'CALL SP_cambiar_contraseña(?, ?)';
                conexionMysql.query(query2, [username, passNuevo], function(error, rows){
                    if(!error){
                        if(rows.affectedRows === 1){
                            res.status(200).json({msg:"Cambio de contraseña exitoso"});
                        }else{
                            res.status(401).send("No se pudo cambiar contraseña");
                        }   
                    }else {
                        res.send(error);
                    }
                });
            }else{
                res.send("La contraseña actual es incorrecta");
            }
        }else{
            res.send(error);
        }
    })

    
};

exports.modificarUsuario =  function (req, res){
    const username = req.user.username;
    const {nombres, apellidos, dni} = req.body;
    const query = 'CALL SP_modificar_usuario(?, ?, ?, ?)';
    conexionMysql.query(query, [username, nombres, apellidos, dni], function(error, rows){
        if(!error){
            if(rows.affectedRows === 1){
                res.status(200).send("Usuario modificado");
            }else{
                res.status(401).send("No se pudo modificar usuario");
            }   
        }else {
            res.send(error);
        }
    });
};

exports.eliminarUsuario = function (req, res){
    const username = req.user.username;
    const query = 'CALL SP_eliminar_usuario(?)';
    conexionMysql.query(query, [username], function(error, rows){
        if(!error){
            if(rows.affectedRows === 1){
                res.status(200).send("Usuario eliminado");
            }else{
                res.status(401).send("No se pudo eliminar usuario");
            }
        }else{
            res.send(error);
        }
    });
};

exports.listarUsuarios = function (req, res){
    const query = 'SELECT * FROM vista_usuarios';
    conexionMysql.query(query, function(error, rows){
        if(!error){
            res.json({
                status: 'success',
                code:200,
                resultado:rows
            });
        }else{
            res.send(error);
        }
    })
};

exports.mostrarUsuario = function (req, res){
    const username = req.params.id;
    const query = 'SELECT * FROM usuario WHERE username = ?';
    conexionMysql.query(query, [username], function(error, rows){
        if(!error){
	    console.log(rows[0]);
	    if(rows[0]=== undefined){
                res.json({
                    status: 'empty',
                    code:300,
                    message:"No hay ningun"
                });
            }else{
                res.json({
                    status: 'success',
                    code:200,
                    deseado:rows[0]
                });
            } 
        }else{
            res.send(error);
        }
    })
}

const CronJob = require('cron').CronJob;
const job = new CronJob('0 */1 * * * *', function() {
    const d = new Date();
      console.log('Siempre 30 minutos:', d);
      console.log('activado');
  });
  job.start();