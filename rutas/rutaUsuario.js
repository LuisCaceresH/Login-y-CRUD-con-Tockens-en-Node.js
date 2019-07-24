const express = require('express');
const router = express.Router();

const controlUsuario = require('../control/controlUsuario');

router.get('/test', controlUsuario.test);
router.post('/login', controlUsuario.identificarUsuario);
router.post('/crear', controlUsuario.crearUsuario);
router.post('/modificar', controlUsuario.modificarUsuario);
router.post('/eliminar', controlUsuario.eliminarUsuario);
router.post('/listar', controlUsuario.listarUsuarios);
module.exports = router;