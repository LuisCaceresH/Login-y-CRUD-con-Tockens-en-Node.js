const express = require('express');
const router = express.Router();

const controlUsuario = require('../control/controlUsuario');

router.get('/test', controlUsuario.test);
router.post('/login', controlUsuario.identificarUsuario);
module.exports = router;