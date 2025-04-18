const express = require("express");
const router = express.Router();
const conexion = require("../config/conexion");
const link = require("../config/link");

router.post("/buscarPaciente", (req, res) => {
  const { tipoId } = req.body;
  const { numeroId } = req.body;
  const sql =
    "SELECT * FROM regpaciente WHERE tipo_identificacion = ? AND num_identific = ? ";
  conexion.query(sql, [tipoId, numeroId], (error, resultados) => {
    if (error) {
      console.error("Error al buscar paciente:", error);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (resultados.length === 0) {
      return res.status(404).json({ error: "Paciente no encontrado" });
    }

    res.json(resultados[0]);
  });
});

// Guardar registro de cita//
router.post("/crearCita", async function (req, res) {
  let idp = req.body.id_paciente;
  let fec = req.body.fechaCita;
  let hrc = req.body.horaCita;
  let mtc = req.body.motivoCita;

  //Registro de la cita
  try {
    const insertar =
      "INSERT INTO citas (Id_Paciente, fecha_cita, hora_cita, motivo_cita) VALUES (?, ?, ?, ?)";

    conexion.query(insertar, [idp, fec, hrc, mtc], function (err) {
      if (err) {
        console.error("Error al registrar cita:", err);
        // Guardar mensaje de error en la sesión para mostrarlo después del redirect
        req.session.mensaje = {
          texto: "⚠️ Error al registrar cita",
          tipo: "error",
        };
        return res.redirect("/crearCita");
      } else {
        console.log("Registro exitoso");
        // Guardar mensaje de éxito en la sesión
        req.session.mensaje = {
          texto: "✅ Cita creada con éxito",
          tipo: "exito",
        };
        return res.redirect("/crearCita");
      }
    });
  } catch (error) {
    console.error("Error al registrar", error);
    req.session.mensaje = { texto: "⚠️ Error en el servidor", tipo: "error" };
    return res.redirect("/crearCita");
  }
});

// Ruta GET para mostrar el formulario (asegúrate de tener esta)
router.get("/crearCita", function (req, res) {
  // Obtener y eliminar el mensaje de la sesión para mostrarlo solo una vez
  const mensaje = req.session.mensaje;
  delete req.session.mensaje;

  res.render("Crear Cita", {
    mensaje: mensaje ? mensaje.texto : null,
    tipoMensaje: mensaje ? mensaje.tipo : null,
    link,
    datos: req.session,
  });
});

module.exports = router;
