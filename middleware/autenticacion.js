const clave = 'Clave Secreta';
const jwt = require('jsonwebtoken');

exports.verificarTokenUsuario = function(req, res, next){
    if(!req.headers.autorizacion) {
        return res.send({
            status : 'error',
            message: 'Token no encontrado',
            code: '400'
        });
    }

    var token = req.headers['autorizacion']
    token = token.replace('Bearer ', '')

    jwt.verify(token, clave, function(err, user) {
        if (err) {
            res.status(401).send({
                error: 'Token no válido o ha expirado'
            })
        }
        next();
    })
}
