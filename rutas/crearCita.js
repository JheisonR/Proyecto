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
        let mensaje = "⚠️ Error al registrar cita";
        return res.render("Crear Cita", { mensaje, link, datos: req.session });
      } else {
        console.log("Registro exitoso");
        let mensaje = "✅ Cita creada con éxito";
        return res.render("Crear Cita", { mensaje, link, datos: req.session });
      }
    });
  } catch (error) {
    console.error("Error al registrar", error);
    let mensaje = "⚠️ Error en el servidor";
    return res.render("Crear Cita", { mensaje, link, datos: req.session });
  }

  req.session.useusu = user.usuario;
});

module.exports = router;
