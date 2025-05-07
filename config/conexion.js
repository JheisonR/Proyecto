let conectar = require("mysql");

let conexion = conectar.createConnection({
  host: "localhost",
  database: "db_psicogestor",
  user: "root",
  password: "",
});

conexion.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("conexión exitosa");
  }
});

module.exports = conexion;
