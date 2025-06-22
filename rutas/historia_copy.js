const express = require("express");
const router = express.Router();
const conexion = require("../config/conexion");
const link = require("../config/link");

// Buscar paciente + historia clínica por documento
router.get("/buscarHistoria/:documento", (req, res) => {
  const documento = req.params.documento;

  const queryPaciente = "SELECT * FROM regpacientes WHERE num_identific = ?";
  conexion.query(queryPaciente, [documento], (err, resultadosPaciente) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }

    if (resultadosPaciente.length === 0) {
      return res.json({ paciente: null });
    }

    const paciente = resultadosPaciente[0];
    const queryHistoria = "SELECT * FROM historiaclinia WHERE Id_Paciente = ?";
    conexion.query(queryHistoria, [paciente.id], (err, resultadosHistoria) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error en la base de datos" });
      }

      res.json({
        paciente,
        historia: resultadosHistoria[0] || null,
      });
    });
  });
});

module.exports = router;

/*
router.post("/buscarHistoria", (req, res) => {
  const { numeroId } = req.body;
  const sql = "SELECT * FROM regpaciente WHERE num_identific = ? ";
  conexion.query(sql, [numeroId], (error, resultados) => {
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

// Guardar registro de historia//
router.post("/historiaClinica", async function (req, res) {
  let idp = req.body.id_paciente;
  let hfm = req.body.histFamiliar;
  let hpn = req.body.histPersonal;
  let sgs = req.body.signoSintoma;
  let aps = req.body.aperPsicológica;
  let dsm = req.body.Dsm5;
  let cie = req.body.Cie10;
  let mtp = req.body.MeTerapeuta;
  let pdt = req.body.planTratamiento;
  let ept = req.body.evoPaciente;

  //Registro de la cita
  try {
    const insertar =
      "INSERT INTO  historiaclinia (Id_Paciente, histFamiliar, histPersonal, signoSintoma, aperPsicológica, Dsm5, Cie10, MeTerapeuta, planTratamiento, evoPaciente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    conexion.query(
      insertar,
      [idp, hfm, hpn, sgs, aps, dsm, cie, mtp, pdt, ept],
      function (err) {
        if (err) {
          console.error("Error al registrar historia:", err);
          // Guardar mensaje de error en la sesión para mostrarlo después del redirect
          req.session.mensaje = {
            texto: "⚠️ Error al registrar historia",
            tipo: "error",
          };
          return res.redirect("/historiaClinica");
        } else {
          console.log("Registro exitoso");
          // Guardar mensaje de éxito en la sesión
          req.session.mensaje = {
            texto: "✅ Historia creada con éxito",
            tipo: "exito",
          };
          return res.redirect("/historiaClinica");
        }
      }
    );
  } catch (error) {
    console.error("Error al registrar", error);
    req.session.mensaje = { texto: "⚠️ Error en el servidor", tipo: "error" };
    return res.redirect("/historiaClinica");
  }
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
});*/
