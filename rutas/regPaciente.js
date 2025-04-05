const express = require("express");
const router = express.Router();
const conexion = require("../config/conexion");
const link = require("../config/link");

router.post("/regPaciente", async function (req, res) {
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
          console.error("Error al registrar paciente:", err);
          let mensaje = "⚠️ Error al registrar paciente";
          return res.render("Registro Paciente", { mensaje, link });
        } else {
          console.log("Registro exitoso");
          let mensaje = "✅ Paciente creado con éxito";
          return res.render("Registro Paciente", { mensaje, link });
        }
      }
    );
  } catch (error) {
    console.error("Error al registrar", error);
    let mensaje = "⚠️ Error en el servidor";
    return res.render("Registro Paciente", { mensaje, link });
  }
});

module.exports = router;
