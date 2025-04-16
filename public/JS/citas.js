function buscarPaciente() {
  const tipoId = document.getElementById("tipoId").value;
  const numeroId = document.getElementById("numeroId").value;

  fetch("/buscarPaciente", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tipoId, numeroId }),
  })
    .then((res) => res.json())
    .then((paciente) => {
      if (paciente.error) {
        alert(paciente.error);
        return;
      }

      // Llenar campos y habilitarlos

      document.getElementById("nombre").value = paciente.nombre;
      document.getElementById("primerApellido").value = paciente.prim_apellido;
      document.getElementById("segundoApellido").value = paciente.segu_apellido;
      document.getElementById("fechaNacimiento").value =
        paciente.fecha_nacimiento.slice(0, 10);
      document.getElementById("lugarNacimiento").value =
        paciente.lugar_nacimiento;
      document.getElementById("estadoCivil").value = paciente.estado_civil;

      // Sexo
      if (paciente.sexo === "masculino") {
        document.getElementById("masculino").checked = true;
      } else if (paciente.sexo === "femenino") {
        document.getElementById("femenino").checked = true;
      }
      document.getElementById("id_paciente").value = paciente.Id_Paciente;
      // Habilitar campos de agendamiento
      document.getElementById("campos-cita").style.display = "grid";
    })
    .catch((err) => {
      console.error("Error al buscar paciente:", err);
      alert("Ocurrió un error al buscar el paciente.");
    });
}

/*document
  .getElementById("buscarPaciente")
  .addEventListener("click", async () => {
    const tipo_id = document.getElementById("tipo_id").value;
    const documento = document.getElementById("documento").value;

    if (!tipo_id || !documento) {
      alert("Debe seleccionar el tipo de identificación y digitar el número.");
      return;
    }

    const response = await fetch(`/buscarPaciente/${tipo_id}/${documento}`);
    const data = await response.json();

    if (data && data.Id_Paciente) {
      document.getElementById("nombrePaciente").textContent = data.nombre;
      document.getElementById("idPaciente").value = data.Id_Paciente;
      document.getElementById("datosPaciente").style.display = "block";
    } else {
      alert("Paciente no encontrado.");
    }
  });

document.getElementById("formCita").addEventListener("submit", async (e) => {
  e.preventDefault();

  const cita = {
    idPaciente: document.getElementById("idPaciente").value,
    fecha_cita: document.getElementById("fecha_cita").value,
    hora_cita: document.getElementById("hora_cita").value,
    motivo_cita: document.getElementById("motivo_cita").value,
  };

  const response = await fetch("/crearCita", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cita),
  });

  const result = await response.json();
  alert(result.message);
  if (result.success) {
    document.getElementById("formCita").reset();
    document.getElementById("datosPaciente").style.display = "none";
  }
});*/
