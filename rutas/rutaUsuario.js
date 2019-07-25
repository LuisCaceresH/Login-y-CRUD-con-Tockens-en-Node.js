const express = require('express');
const auth = require('../middleware/autenticacion');

const router = express.Router();
const controlUsuario = require('../control/controlUsuario');

router.get('/test', controlUsuario.test);
router.post('/login', controlUsuario.identificarUsuario);
router.post('/crear', auth.verificarTokenUsuarioAdmin, controlUsuario.crearUsuario);
router.post('/modificar', auth.verificarTokenUsuarioAdmin, controlUsuario.modificarUsuario);
router.post('/eliminar',auth.verificarTokenUsuario, controlUsuario.eliminarUsuario);
router.post('/listar',auth.verificarTokenUsuario, controlUsuario.listarUsuarios);
router.post('/usuario', controlUsuario.mostrarUsuario);
module.exports = router;