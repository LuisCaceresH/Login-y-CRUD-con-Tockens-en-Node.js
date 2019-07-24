const conexionMysql = require('./conexion');

exports.validarUsuario = async function(username, password){
    await conexionMysql.query(`SELECT * FROM USUARIO WHERE username ='`+username+`' 
    AND password = '`+password+`'`, function (error, rows){
        if (error) throw error;
        if (rows[0]!=null){
            return true;
        }else{
            return false;
        }
        
    });
};

exports.agregarUsuario = async function(username, password, nombres, apellidos){
    await conexionMysql.query(`INSERT INTO USUARIO (username, password, nombres, apellidos) VALUES ('`+username+`', '`+password+`', '`+nombres+`', '`+apellidos+`')`, function(error, rows){
        if(error) throw error;
        return 1;
    });
};

exports.editarUsuario = async function(username, password, nombres, apellidos){
    await conexionMysql.query(`UPDATE USUARIO SET password ='`+password+`', nombres = '`+nombres+`', apellidos = '`+apellidos+`' WHERE username = '`+username+`'`, function(error, rows){
        if(error) throw error;
    });
};

exports.eliminarUsuario = async function (username){
    await conexionMysql.query(`DELETE FROM USUARIO WHERE username ='`+username+`'`, function(error, rows){
        if(error) throw error;
        return 1;
    });
};

exports.listarUsuarios = async function (){
    await conexionMysql.query(`SELECT * FROM USUARIO`, function(error, rows){
        if(error) throw error;
        console.log(rows);
        return rows;
    });
};