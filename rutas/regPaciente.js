const express = require("express");
const router = express.Router();
const conexion = require("../config/conexion");
const link = require("../config/link");

router.post("/regPaciente", async function (req, res) {
  if (!req.session.login) {
    return res.redirect("/index");
  }
  let nom = req.body.nombre;
  let pap = req.body.primerApellido;
  let sap = req.body.segundoApellido;
  let sex = req.body.sexo;
  let tid = req.body.tipoId;
  let nid = req.body.numeroId;
  let fnc = req.body.fechaNacimiento;
  let lnc = req.body.lugarNacimiento;
  let ecv = req.body.estadoCivil;
  let eda = req.body.edad;
  let tel = req.body.telefono;
  let ema = req.body.email;
  let dir = req.body.direccion;
  let ocu = req.body.ocupacion;
  let cem = req.body.perContacto;
  let nem = req.body.numeroCont;
  let ime = req.body.infoMedica;
  let dpv = req.body.diagnosticoPrevio;
  let eps = req.body.eps;
  let mda = req.body.medicActual;
  let pqm = req.body.porqueMotivo;
  let alg = req.body.alergias;
  let mvc = req.body.motivoConsulta;
  let sintomas = req.body.sintomas || [];
  let anf = req.body.antecFamiliares;
  let cual = req.body.cuales;
  let pes = req.body.pensaSuicidas;
  let rat = req.body.apoyoTratamiento;
  let cst = req.body.consumoSustancias;
  let csn = req.body.calidadSueno;
  let obs = req.body.observaciones;

  let sintomasString = Array.isArray(sintomas) ? sintomas.join(", ") : sintomas;

  //Registro del paciente
  try {
    const insertar =
      "INSERT INTO regpaciente (nombre, prim_apellido, segu_apellido, sexo, tipo_identificacion, num_identific, fecha_nacimiento, lugar_nacimiento, estado_civil, edad, telefono, email, address, ocupacion, Nom_emergencia, tel_emergencia, aten_psicologica, Diag_previos, eps, medic_actual, aten_porque, alergias, motivo_consulta, sintomas, antec_familiares, cuales, pensam_suicidas, apoyo_tratamiento, consum_sustancia, calidad_sueño, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    conexion.query(
      insertar,
      [
        nom,
        pap,
        sap,
        sex,
        tid,
        nid,
        fnc,
        lnc,
        ecv,
        eda,
        tel,
        ema,
        dir,
        ocu,
        cem,
        nem,
        ime,
        dpv,
        eps,
        mda,
        pqm,
        alg,
        mvc,
        sintomasString,
        anf,
        cual,
        pes,
        rat,
        cst,
        csn,
        obs,
      ],
      function (err) {
        if (err) {
          console.error("Error al registrar cita:", err);
          // Guardar mensaje de error en la sesión para mostrarlo después del redirect
          req.session.mensaje = {
            texto: "⚠️ Error al registrar paciente",
            tipo: "error",
          };
          return res.redirect("/regPaciente");
        } else {
          console.log("Registro exitoso");
          // Guardar mensaje de éxito en la sesión
          req.session.mensaje = {
            texto: "✅ Paciente creado con éxito",
            tipo: "exito",
          };
          return res.redirect("/regPaciente");
        }
      }
    );
  } catch (error) {
    console.error("Error al registrar", error);
    req.session.mensaje = { texto: "⚠️ Error en el servidor", tipo: "error" };
    return res.redirect("/regPaciente");
  }
});

// Ruta GET para mostrar el formulario (asegúrate de tener esta)
router.get("/regPaciente", function (req, res) {
  // Obtener y eliminar el mensaje de la sesión para mostrarlo solo una vez
  const mensaje = req.session.mensaje;
  delete req.session.mensaje;

  res.render("Registro Paciente", {
    mensaje: mensaje ? mensaje.texto : null,
    tipoMensaje: mensaje ? mensaje.tipo : null,
    link,
    datos: req.session,
  });
});

module.exports = router;
