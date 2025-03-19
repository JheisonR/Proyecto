const express = require("express");
const router = express.Router();
const conexion = require("../config/conexion");
const link = require("../config/link");

router.post("/crearCita", async function (req, res) {
  let nom = req.body.nombre;
  let pap = req.body.primerApellido;
  let sap = req.body.segundoApellido;
  let sex = req.body.sexo;
  let tid = req.body.tipoId;
  let nid = req.body.numeroId;
  let fnc = req.body.fechaNacimiento;
  let lnc = req.body.lugarNacimiento;
  let ecv = req.body.estadoCivil;
  let fct = req.body.fechaCita;
  let hct = req.body.horaCita;
  let mct = req.body.motivoCita;

  //Registro de la cita
  try {
    const insertar =
      "INSERT INTO crear_cita (nombre, prim_apellido, segu_apellido, sexo, tipo_identificacion, num_identific, fecha_nacimiento, lugar_nacimiento, estado_civil, fecha_cita, hora_cita, motivo_cita) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    conexion.query(
      insertar,
      [nom, pap, sap, sex, tid, nid, fnc, lnc, ecv, fct, hct, mct],
      function (err) {
        if (err) {
          console.error("Error al registrar cita:", err);
          let mensaje = "⚠️ Error al registrar cita";
          return res.render("Crear Cita", { mensaje, link });
        } else {
          console.log("Registro exitoso");
          let mensaje = "✅ Cita creada con éxito";
          return res.render("Crear Cita", { mensaje, link });
        }
      }
    );
  } catch (error) {
    console.error("Error al registrar", error);
    let mensaje = "⚠️ Error en el servidor";
    return res.render("Crear Cita", { mensaje, link });
  }
});

module.exports = router;
