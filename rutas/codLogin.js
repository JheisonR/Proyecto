const express = require("express");
const router = express.Router();
const link = require("../config/link");
const conexion = require("../config/conexion");
const bcrypt = require("bcrypt");

// Definimos la ruta de login
router.post("/codLogin", function (req, res) {
  const usu = req.body.username.trim(); // Elimina espacios en blanco
  const con = req.body.password.trim(); // Elimina espacios en blanco

  // Validar si el usuario existe
  const validar = "SELECT * FROM registro WHERE usuario = ?";
  conexion.query(validar, [usu], async function (error, rows) {
    let mensaje;
    if (error) {
      console.log("Error en la consulta para validar el usuario", error);
      return res.status(500).send("Error en el servidor");
    }

    if (rows.length < 1) {
      mensaje = "El usuario ingresado no existe";
      res.render("index", { mensaje, link });
    } else {
      // Validar contraseña
      const user = rows[0];
      console.log("Datos del usuario:", user); // Depuración

      // Comparar la contraseña ingresada con el campo "contrasena"
      const match = await bcrypt.compare(con, user.contrasena);
      console.log("¿Coinciden las contraseñas?", match); // Depuración

      if (!match) {
        mensaje = "Contraseña incorrecta";
        return res.render("index", { mensaje, link });
      } else {
        // Iniciar sesión
        req.session.login = true;
        req.session.codusu = user.Id_Usuario;
        req.session.nomusu = user.nombre;
        req.session.emausu = user.email;
        req.session.useusu = user.usuario;
        req.session.conusu = user.contrasena;
        console.log("Sesión iniciada:", req.session); // Comprobar los datos que inician la sesión
        res.redirect("/Bienvenido");
      }
    }
  });
});

//Ruta para el cierre de sesión
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      return res.status(500).send("Error al cerrar sesión");
    }

    // Headers para evitar caché
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    // Redirigir al login
    res.redirect("/index");
  });
});

module.exports = router;
