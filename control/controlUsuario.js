const conexionMysql = require('../database/conexion');
const jwt = require('../middleware/jwt');

exports.test = function (req, res) {
    res.send('Funciona!');
};

exports.identificarUsuario = function (req, res) {
    const {username, password} = req.body;
    const query = 'SELECT * FROM usuario WHERE username = ? AND password = ?';
    conexionMysql.query(query, [username, password], function(error, rows){
        if(!error){
            if(rows[0]!=null){
                token = jwt.crearTokenUsuario(rows[0][0]);
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
    const {username, password, nombres, apellidos, dni} = req.body;
    const query = 'INSERT INTO USUARIO VALUES (?, ?, ?, ?, ?)';
    conexionMysql.query(query, [username, password, nombres, apellidos, dni], function (error, rows){
        if(!error){
            if(rows.affectedRows === 1){
                res.status(200).send("Usuario creado exitosamente");
            }else{
                res.status(401).send("No se pudo crear usuario");
            }
        }else{
            res.send(error);
        }
    })
};

exports.modificarUsuario =  function (req, res){
    const {username, password, nombres, apellidos, dni} = req.body;
    const query = 'UPDATE USUARIO SET password = ?, nombres = ?, apellidos = ?, dni = ? WHERE username = ?';
    conexionMysql.query(query, [password, nombres, apellidos, dni, username], function(error, rows){
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
    const {username} = req.body;
    const query = 'DELETE FROM USUARIO WHERE username = ?';
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
    const query = 'SELECT * FROM usuario';
    conexionMysql.query(query, function(error, rows){
        if(!error){
            res.status(200).send(rows);
        }else{
            res.send(error);
        }
    })
};

exports.mostrarUsuario = function (req, res){
    const {username} = req.body;
    const query = 'SELECT * FROM usuario WHERE username = ?';
    conexionMysql.query(query, [username], function(error, rows){
        if(!error){
            res.status(200).send(rows);
        }else{
            res.send(error);
        }
    })
}
