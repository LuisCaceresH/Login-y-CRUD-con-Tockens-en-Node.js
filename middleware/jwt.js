const jwt = require('jsonwebtoken');
const clave = 'Clave Secreta';
exports.crearTokenUsuario = function (username){
    const tokenData = {
        username: username
        // ANY DATA
    }
    const token = jwt.sign(tokenData, clave, {
        expiresIn: 60 * 60 * 24 // expira en 24 horas
    })
    return token;
}