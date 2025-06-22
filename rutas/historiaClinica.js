const express = require("express");
const router = express.Router();
const conexion = require("../config/conexion");
const link = require("../config/link");

// BUSCAR por tipo y número de identificación
router.post("/historiaClinica/buscar", (req, res) => {
  const { tipoId, numeroId } = req.body;

  const sqlPaciente = `
    SELECT * FROM regpaciente WHERE tipo_identificacion = ? AND num_identific = ?
  `;

  conexion.query(sqlPaciente, [tipoId, numeroId], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length === 0) return res.json({ encontrado: false });

    const paciente = results[0];
    const idPaciente = paciente.Id_Paciente;

    const sqlHistoria = `
      SELECT * FROM historiaclinia WHERE Id_Paciente = ?
    `;
    conexion.query(sqlHistoria, [idPaciente], (err2, historiaResults) => {
      if (err2) return res.status(500).json({ error: err2 });

      const historia = historiaResults.length > 0 ? historiaResults[0] : null;
      res.json({ encontrado: true, paciente, historia });
    });
  });
});

// GUARDAR o ACTUALIZAR datos
router.post("/historiaClinica", (req, res) => {
  const datos = req.body;
  const idPaciente = datos.id_paciente;

  const camposPaciente = {
    nombre: datos.nombre,
    prim_apellido: datos.primerApellido,
    segu_apellido: datos.segundoApellido,
    sexo: datos.sexo,
    tipo_identificacion: datos.tipoId,
    num_identific: datos.numeroId,
    fecha_nacimiento: datos.fechaNacimiento,
    lugar_nacimiento: datos.lugarNacimiento,
    estado_civil: datos.estadoCivil,
    edad: datos.edad,
    telefono: datos.telefono,
    email: datos.email,
    address: datos.direccion,
    ocupacion: datos.ocupacion,
    Nom_emergencia: datos.perContacto,
    tel_emergencia: datos.numeroCont,
    aten_psicologica: datos.infoMedica,
    Diag_previos: datos.diagnosticoPrevio,
    eps: datos.eps,
    medic_actual: datos.medicActual,
    aten_porque: datos.porqueMotivo,
    alergias: datos.alergias,
    motivo_consulta: datos.motivoConsulta,
    sintomas: Array.isArray(datos.sintomas)
      ? datos.sintomas.join(",")
      : datos.sintomas,
    antec_familiares: datos.antecFamiliares,
    cuales: datos.cuales,
    pensam_suicidas: datos.pensaSuicidas,
    apoyo_tratamiento: datos.apoyoTratamiento,
    consum_sustancia: datos.consumoSustancias,
    calidad_sueño: datos.calidadSueno,
    observaciones: datos.observaciones,
  };
  const camposHistoria = {
    histFamiliar: datos.historiaFamiliar,
    histPersonal: datos.historiaPersonal,
    signoSintoma: datos.signosSintomas,
    aperPsicologica: datos.apertPsicologica,
    Dsm5: datos.Dsm5,
    Cie10: datos.Cie10,
    MeTerapeuta: datos.metaTerapeuta,
    planTratamiento: datos.planTratamiento,
    evoPaciente: datos.evoPaciente,
  };

  const sqlUpdatePaciente = `UPDATE regpaciente SET ? WHERE Id_Paciente = ?`;
  const sqlFinal = conexion.format(sqlUpdatePaciente, [
    camposPaciente,
    idPaciente,
  ]);
  console.log("SQL ejecutada:", sqlFinal); // 👈 Aquí verás la query real en consola
  console.log("Actualizando paciente", { idPaciente, camposPaciente });
  conexion.query(sqlUpdatePaciente, [camposPaciente, idPaciente], (err) => {
    if (err) return res.status(500).json({ error: err });

    const sqlSelectHistoria = `
      SELECT Id_Historia FROM historiaclinia WHERE Id_Paciente = ?
    `;
    conexion.query(sqlSelectHistoria, [idPaciente], (err2, rows) => {
      if (err2) return res.status(500).json({ error: err2 });

      if (rows.length > 0) {
        const sqlUpdateHistoria = `
          UPDATE historiaclinia SET ? WHERE Id_Paciente = ?
        `;
        conexion.query(
          sqlUpdateHistoria,
          [camposHistoria, idPaciente],
          (err3) => {
            if (err3) {
              console.error("Error al actualizar historia", err);
              req.session.mensaje = {
                texto: "❌ Error al actualizar historia",
                tipo: "error",
              };
              return res.redirect("/historiaClinica");
            } else {
              console.log("Historia actualizada exitosamente");
              req.session.mensaje = {
                texto: "✅ Historia actualizada con éxito",
                tipo: "exito",
              };
              return res.redirect("/historiaClinica");
            }
          }
        );
      } else {
        const sqlInsertHistoria = `
          INSERT INTO historiaclinia SET Id_Paciente = ?, ?
        `;
        conexion.query(
          sqlInsertHistoria,
          [idPaciente, camposHistoria],
          (err4) => {
            if (err4) {
              console.error("Error al registrar historia:", err);
              req.session.mensaje = {
                texto: "❌ Error al registrar historia",
                tipo: "error",
              };
              return res.redirect("/historiaClinica");
            } else {
              console.log("Historia registrada con éxito");
              req.session.mensaje = {
                texto: "✅ Historia registrada con éxito",
                tipo: "exito",
              };
              return res.redirect("/historiaClinica");
            }
          }
        );
      }
    });
  });
});

// Ruta GET para mostrar el formulario
router.get("/historiaClinica", function (req, res) {
  // Obtener y eliminar el mensaje de la sesión para mostrarlo solo una vez
  const mensaje = req.session.mensaje;
  delete req.session.mensaje;

  res.render("historiaClinica", {
    mensaje: mensaje ? mensaje.texto : null,
    tipoMensaje: mensaje ? mensaje.tipo : null,
    link,
    datos: req.session,
  });
});

module.exports = router;
