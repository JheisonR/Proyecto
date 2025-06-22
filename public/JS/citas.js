function buscarPaciente() {
  const tipoId = document.getElementById("tipoId").value;
  const numeroId = document.getElementById("numeroId").value;
  const btnBuscar = document.getElementById("btnBuscar");
  const btnGuardar = document.getElementById("btnGuardar");

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

      // Habilitar campos de agendamiento y cambiar botones
      document.getElementById("campos-cita").style.display = "grid";
      btnBuscar.style.display = "none"; // Ocultar buscar
      btnGuardar.style.display = "block"; // Mostrar guardar
    })
    .catch((err) => {
      console.error("Error al buscar paciente:", err);
      alert("Ocurrió un error al buscar el paciente.");
    });
}

// Función para resetear el formulario
function limpiarFormulario() {
  document.getElementById("btnBuscar").style.display = "block";
  document.getElementById("btnGuardar").style.display = "none";
  document.getElementById("campos-cita").style.display = "none";
}
