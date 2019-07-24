const mysql = require('mysql');

const conexion = mysql.createConnection({
  host: "localhost",
  database: "bd_prueba",
  user: "root",
  password: "12345678"
});

conexion.connect(function(err) {
  if (err) throw err;
  console.log("Conectado!");
});

module.exports = conexion;