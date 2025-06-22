const express = require("express");
const router = express.Router();
const conexion = require("../config/conexion");
const link = require("../config/link");

router.post("/buscarPaciente", (req, res) => {
  const { tipoId, numeroId } = req.body;

  const sqlPaciente =
    "SELECT * FROM regpaciente WHERE tipo_identificacion = ? AND num_identific = ?";

  conexion.query(
    sqlPaciente,
    [tipoId, numeroId],
    (error, resultadosPaciente) => {
      if (error) {
        console.error("Error al buscar paciente:", error);
        return res.status(500).json({ error: "Error en el servidor" });
      }

      if (resultadosPaciente.length === 0) {
        return res.status(404).json({ error: "Paciente no encontrado" });
      }

      const paciente = resultadosPaciente[0];
      const idPaciente = paciente.Id_Paciente; // Usar Id_Paciente correctamente

      const sqlHistoria = "SELECT * FROM historiaclinia WHERE Id_Paciente = ?";

      conexion.query(
        sqlHistoria,
        [idPaciente],
        (errorHistoria, resultadosHistoria) => {
          if (errorHistoria) {
            console.error("Error al buscar historia clínica:", errorHistoria);
            return res
              .status(500)
              .json({ error: "Error al buscar historia clínica" });
          }

          const historiaClinica =
            resultadosHistoria.length > 0 ? resultadosHistoria[0] : null;

          res.json({
            ...paciente,
            historiaClinica: historiaClinica, // Asegúrate de incluir la historia en la respuesta
          });
        }
      );
    }
  );
});

// Guardar registro de historia//
// Guardar registro de historia//
router.post("/historiaClinica", function (req, res) {
  // Validar datos mínimos
  if (!req.body.id_paciente) {
    req.session.mensaje = {
      texto: "⚠️ ID de paciente no proporcionado",
      tipo: "error",
    };
    return res.redirect("/historiaClinica");
  }

  // Extraer solo los campos necesarios
  const {
    id_paciente,
    nombre,
    primerApellido,
    segundoApellido,
    sexo,
    fechaNacimiento,
    lugarNacimiento,
    estadoCivil,
    edad,
    telefono,
    email,
    direccion,
    ocupacion,
    perContacto,
    numeroCont,
    aten_psicologica,
    diagnosticoPrevio,
    eps,
    medicActual,
    respuesta_extra,
    alergias,
    motivoConsulta,
    sintomas,
    antec_familiares,
    respuesta_extra1,
    pensam_suicidas,
    respuesta_extra2,
    consumoSustancias,
    calidadSueno,
    observaciones,
    historiaFamiliar,
    historiaPersonal,
    signosSintomas,
    apertPsicologica,
    Dsm5,
    Cie10,
    metaTerapeuta,
    planTratamiento,
    evoPaciente,
  } = req.body;

  // Iniciar transacción
  conexion.beginTransaction(function (err) {
    if (err) {
      console.error("Error al iniciar transacción:", err);
      req.session.mensaje = {
        texto: "⚠️ Error al iniciar transacción",
        tipo: "error",
      };
      return res.redirect("/historiaClinica");
    }

    // 1. Consulta para actualizar paciente
    const updatePaciente = `
      UPDATE regpaciente SET 
        nombre = ?, prim_apellido = ?, segu_apellido = ?, sexo = ?,
        fecha_nacimiento = ?, lugar_nacimiento = ?, estado_civil = ?, edad = ?,
        telefono = ?, email = ?, address = ?, ocupacion = ?,
        Nom_emergencia = ?, tel_emergencia = ?, aten_psicologica = ?,
        Diag_previos = ?, eps = ?, medic_actual = ?, aten_porque = ?,
        alergias = ?, motivo_consulta = ?, sintomas = ?,
        antec_familiares = ?, cuales = ?, pensam_suicidas = ?,
        apoyo_tratamiento = ?, consum_sustancia = ?, calidad_sueño = ?,
        observaciones = ?
      WHERE Id_Paciente = ?`;

    // Preparar datos para la consulta
    const datosPaciente = [
      nombre || "",
      primerApellido || "",
      segundoApellido || "",
      sexo || "",
      fechaNacimiento || null,
      lugarNacimiento || "",
      estadoCivil || "",
      edad || "",
      telefono || "",
      email || "",
      direccion || "",
      ocupacion || "",
      perContacto || "",
      numeroCont || "",
      aten_psicologica || "",
      diagnosticoPrevio || "",
      eps || "",
      medicActual || "",
      respuesta_extra || "",
      alergias || "",
      motivoConsulta || "",
      sintomas || "",
      antec_familiares || "",
      respuesta_extra1 || "",
      pensam_suicidas || "",
      respuesta_extra2 || "",
      consumoSustancias || "",
      calidadSueno || "",
      observaciones || "",
      id_paciente, // Este debe ser el ÚLTIMO elemento del array
    ];

    // Ejecutar actualización de paciente
    conexion.query(updatePaciente, datosPaciente, function (err, result) {
      if (err) {
        return conexion.rollback(function () {
          console.error("Error al actualizar paciente:", err);
          console.log("Consulta fallida:", updatePaciente);
          console.log("Datos enviados:", datosPaciente);
          req.session.mensaje = {
            texto: "⚠️ Error al actualizar datos del paciente",
            tipo: "error",
          };
          res.redirect("/historiaClinica");
        });
      }

      // 2. Manejar historia clínica (insertar o actualizar)
      const verificarHistoria =
        "SELECT * FROM historiaclinia WHERE Id_Paciente = ?";

      conexion.query(
        verificarHistoria,
        [id_paciente],
        function (err, resultados) {
          if (err) {
            return conexion.rollback(function () {
              console.error("Error al verificar historia:", err);
              req.session.mensaje = {
                texto: "⚠️ Error al verificar historia clínica",
                tipo: "error",
              };
              res.redirect("/historiaClinica");
            });
          }

          const queryHistoria =
            resultados.length > 0
              ? `UPDATE historiaclinia SET 
            histFamiliar = ?, histPersonal = ?, signoSintoma = ?, aperPsicologica = ?,
            Dsm5 = ?, Cie10 = ?, MeTerapeuta = ?, planTratamiento = ?, evoPaciente = ?
           WHERE Id_Paciente = ?`
              : `INSERT INTO historiaclinia 
            (Id_Paciente, histFamiliar, histPersonal, signoSintoma, aperPsicologica, 
             Dsm5, Cie10, MeTerapeuta, planTratamiento, evoPaciente)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          const datosHistoria =
            resultados.length > 0
              ? [
                  historiaFamiliar || "",
                  historiaPersonal || "",
                  signosSintomas || "",
                  apertPsicologica || "",
                  Dsm5 || "",
                  Cie10 || "",
                  metaTerapeuta || "",
                  planTratamiento || "",
                  evoPaciente || "",
                  id_paciente,
                ]
              : [
                  id_paciente,
                  historiaFamiliar || "",
                  historiaPersonal || "",
                  signosSintomas || "",
                  apertPsicologica || "",
                  Dsm5 || "",
                  Cie10 || "",
                  metaTerapeuta || "",
                  planTratamiento || "",
                  evoPaciente || "",
                ];

          conexion.query(queryHistoria, datosHistoria, function (err, result) {
            if (err) {
              return conexion.rollback(function () {
                console.error("Error al guardar historia:", err);
                req.session.mensaje = {
                  texto: "⚠️ Error al guardar historia clínica",
                  tipo: "error",
                };
                res.redirect("/historiaClinica");
              });
            }

            // Si todo salió bien, hacer commit
            conexion.commit(function (err) {
              if (err) {
                return conexion.rollback(function () {
                  console.error("Error al hacer commit:", err);
                  req.session.mensaje = {
                    texto: "⚠️ Error al guardar cambios",
                    tipo: "error",
                  };
                  res.redirect("/historiaClinica");
                });
              }

              req.session.mensaje = {
                texto: "✅ Datos guardados correctamente",
                tipo: "exito",
              };
              res.redirect("/historiaClinica");
            });
          });
        }
      );
    });
  });
});

// Ruta GET para mostrar el formulario (asegúrate de tener esta)
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
