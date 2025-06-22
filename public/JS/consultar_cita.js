// CONSULTAR PACIENTE Y CITAS
//formatear fecha- dd/mm/aaaa
function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear();
  return `${dia}-${mes}-${anio}`;
}

//Formatear hora - formato am, pm
function formatearHora(horaISO) {
  const hora = new Date(`1970-01-01T${horaISO}`);
  let horas = hora.getHours();
  const minutos = String(hora.getMinutes()).padStart(2, "0");
  const ampm = horas >= 12 ? "PM" : "AM";
  horas = horas % 12;
  horas = horas ? horas : 12; // el 0 se convierte en 12
  return `${horas}:${minutos} ${ampm}`;
}

async function consultarPaciente() {
  const documento = document.getElementById("buscarDocumento").value;

  if (!documento) {
    alert("Por favor ingrese un número de documento");
    return;
  }

  try {
    const response = await fetch(`/consultar_cita/${documento}`);
    const data = await response.json();

    if (data.paciente) {
      document.getElementById("nombrePaciente").textContent =
        data.paciente.nombrePaciente || "Paciente no encontrado";
      document.getElementById(
        "cedulaPaciente"
      ).textContent = `Cédula: ${data.paciente.num_identific}`;
      document.getElementById(
        "telPaciente"
      ).textContent = `Teléfono: ${data.paciente.telefono}`;

      // Mostrar citas
      const tabla = document.getElementById("tabla-citas");
      tabla.innerHTML = "";

      data.citas.forEach((cita) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
  <td class="motivocita">${cita.motivo_cita}</td>
  <td>${formatearFecha(cita.fecha_cita)}</td>
  <td>${formatearHora(cita.hora_cita)}</td>
  <td class="acciones">
    <button class="modificar" onclick="abrirModal(${
      cita.Id_Cita
    })">Modificar</button>
    <button class="cancelar" onclick="cancelarCita(${
      cita.Id_Cita
    })">Cancelar</button>
  </td>
`;
        // 👉 Aquí agregas el event listener al hacer clic sobre el texto del motivo
        const celdaMotivo = fila.querySelector(".motivocita");
        celdaMotivo.addEventListener("click", function () {
          this.classList.toggle("expandido");
        });

        tabla.appendChild(fila);
      });

      document.getElementById("resultados").classList.remove("oculto");
    } else {
      alert("Paciente no encontrado");
      document.getElementById("resultados").classList.add("oculto");
    }
  } catch (error) {
    console.error(error);
    alert("Error al consultar paciente");
  }
}

// ABRIR MODAL PARA REAGENDAR
function abrirModal(idCita) {
  document.getElementById("cita-id").value = idCita;
  document.getElementById("reprogramar-modal").style.display = "flex";
}

// CERRAR MODAL
document.querySelectorAll(".close-modal").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById("reprogramar-modal").style.display = "none";
  });
});

// CONFIRMAR MODIFICACIÓN
document
  .getElementById("reprogramar-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const idCita = document.getElementById("cita-id").value;
    const nuevaFecha = document.getElementById("new-date").value;
    const nuevaHora = document.getElementById("new-time").value;
    const notas = document.getElementById("notes").value;

    try {
      const response = await fetch(`/modificar_cita/${idCita}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fecha: nuevaFecha,
          hora: nuevaHora,
          motivo: notas,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Cita modificada exitosamente");
        document.getElementById("reprogramar-modal").style.display = "none";
        consultarPaciente(); // Refrescar datos
      } else {
        alert("Error al modificar cita");
      }
    } catch (error) {
      console.error(error);
      alert("Error al modificar cita");
    }
  });

// CANCELAR CITA
async function cancelarCita(idCita) {
  if (!confirm("¿Está seguro que desea cancelar esta cita?")) return;

  try {
    const response = await fetch(`/cancelar_cita/${idCita}`, {
      method: "DELETE",
    });

    const result = await response.json();
    if (result.success) {
      alert("Cita cancelada exitosamente");
      consultarPaciente(); // Refrescar datos
    } else {
      alert("Error al cancelar cita");
    }
  } catch (error) {
    console.error(error);
    alert("Error al cancelar cita");
  }
}
