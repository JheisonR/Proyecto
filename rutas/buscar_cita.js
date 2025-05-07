const express = require("express");
const router = express.Router();
const conexion = require("../config/conexion");
const link = require("../config/link");

// CONSULTAR PACIENTE Y CITAS
router.get("/consultar_cita/:documento", (req, res) => {
  const documento = req.params.documento;

  const queryPaciente = `
    SELECT 
      Id_Paciente AS idPaciente, -- obtener el ID interno
      UPPER(CONCAT(nombre, ' ', prim_apellido, ' ', segu_apellido)) AS nombrePaciente, 
      num_identific, 
      telefono 
    FROM regpaciente 
    WHERE num_identific = ?
  `;

  conexion.query(queryPaciente, [documento], (err, pacienteResult) => {
    if (err)
      return res.status(500).json({ error: "Error en la base de datos" });

    if (pacienteResult.length === 0) {
      return res.json({ paciente: null, citas: [] });
    }

    const idPaciente = pacienteResult[0].idPaciente;

    const queryCitas = `
      SELECT 
        Id_Cita, 
        fecha_cita, 
        hora_cita, 
        motivo_cita 
      FROM citas 
      WHERE Id_Paciente = ?
    `;

    conexion.query(queryCitas, [idPaciente], (err, citasResult) => {
      if (err)
        return res.status(500).json({ error: "Error en la base de datos" });

      res.json({
        paciente: pacienteResult[0],
        citas: citasResult,
      });
    });
  });
});

// MODIFICAR CITA
router.put("/modificar_cita/:id", (req, res) => {
  const id = req.params.id;
  const { fecha, hora, motivo } = req.body;

  const query =
    "UPDATE citas SET fecha_cita = ?, hora_cita = ?, motivo_cita = ? WHERE Id_Cita = ?";
  conexion.query(query, [fecha, hora, motivo, id], (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
});

// CANCELAR CITA
router.delete("/cancelar_cita/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM citas WHERE Id_Cita = ?";
  conexion.query(query, [id], (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
});

module.exports = router;
