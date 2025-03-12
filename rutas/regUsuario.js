const express = require("express");
const router = express.Router();
const conexion = require("../config/conexion");
const link = require("../config/link");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/regUsuario", async function (req, res) {
  let nom = req.body.name;
  let cor = req.body.email;
  let usu = req.body.username;
  let con = req.body.password;
  let cps = req.body.confirmPassword;

  //validación de contraseña
  if (con !== cps) {
    let mensaje = "❌ Las contraseñas no coinciden";
    return res.render("Registro", { mensaje, link });
  }

  try {
    const hashedpas = await bcrypt.hash(con, saltRounds);

    const insertar =
      "INSERT INTO registro (nombre, email, usuario, contrasena, con_contrasena) VALUES (?, ?, ?, ?, ?)";

    conexion.query(
      insertar,
      [nom, cor, usu, hashedpas, hashedpas],
      function (err) {
        if (err) {
          console.log("Error al intertar registrar usuario");
          let mensaje = "⚠️ Error al registrar usuario";
          return res.render("Registro", { mensaje, link });
        } else {
          console.log("Registro exitoso");
          let mensaje = "✅ Registro exitoso, inicia sesión";
          res.render("index", { mensaje, link });
        }
      }
    );
  } catch (error) {
    console.error("Error al registrar", error);
    let mensaje = "⚠️ Error en el servidor";
    res.render("Registro", { mensaje, link });
  }
});

module.exports = router;
