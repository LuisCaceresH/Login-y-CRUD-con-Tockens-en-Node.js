const express = require('express');
const auth = require('../middleware/autenticacion');

const router = express.Router();
const controlUsuario = require('../control/controlUsuario');

router.get('/test', controlUsuario.test);
router.post('/login', controlUsuario.loginUsuario);
router.post('/loginAdmin', controlUsuario.loginUsuarioAdmin);
router.post('/crear', controlUsuario.crearUsuario);
router.post('/cambiarcontrasena', auth.verificarTokenUsuario, controlUsuario.cambiarContraseña);
router.post('/modificar', auth.verificarTokenUsuario, controlUsuario.modificarUsuario);
router.post('/eliminar',auth.verificarTokenUsuario, controlUsuario.eliminarUsuario);
router.get('/usuarios', controlUsuario.listarUsuarios);
router.get('/:id', controlUsuario.mostrarUsuario);
module.exports = router;