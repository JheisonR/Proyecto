/*function buscarHistoria() {
  const numeroId = document.getElementById("numeroId").value;
  const btnBuscar = document.getElementById("botonBuscar");
  const buscar = document.getElementById("buscador");
  const btnGuardar = document.getElementById("btnGuardar");
  const btnEditar = document.getElementById("editar");

  fetch("/buscarHistoria", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ numeroId }),
  })
    .then((res) => res.json())
    .then((paciente) => {
      if (paciente.error) {
        alert(paciente.error);
        return;
      }*/

const { error } = require("console");

function buscarHistoria() {
  const documento = document.getElementById("buscarhistoria").value;

  fetch(`/buscarHistoria/${documento}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.paciente) {
        document.getElementById("formHistoria").style.display = "block";

        // Mostrar formulario
        document.getElementById("formHistoria").style.display = "block";

        //Lenar Campos
        document.getElementById("nombre").value = paciente.nombre || "";
        document.getElementById("primerApellido").value =
          paciente.primerApellido || "";
        document.getElementById("segundoApellido").value =
          paciente.segundoApellido || "";
        document.getElementById("fechaNacimiento").value =
          paciente.fecha_nacimiento.slice(0, 10) || "";
        document.getElementById("lugarNacimiento").value =
          paciente.lugar_nacimiento || "";
        document.getElementById("estadoCivil").value =
          paciente.estado_civil || "";

        // Sexo
        if (paciente.sexo === "masculino") {
          document.getElementById("masculino").checked = true;
        } else if (paciente.sexo === "femenino") {
          document.getElementById("femenino").checked = true;
        }

        document.getElementById("tipoId").value =
          paciente.tipo_identificacion || "";
        document.getElementById("numeroId").value =
          paciente.num_identific || "";
        document.getElementById("telefono").value = paciente.telefono || "";
        document.getElementById("email").value = paciente.email || "";
        document.getElementById("direccion").value = paciente.address || "";
        document.getElementById("ocupacion").value = paciente.ocupacion || "";
        document.getElementById("perContacto").value =
          paciente.Nom_emergencia || "";
        document.getElementById("numeroCont").value =
          paciente.tel_emergencia || "";

        if (paciente.aten_psicologica === "Si") {
          document.getElementById("yes").checked = true;
        } else if (paciente.aten_psicologica === "no") {
          document.getElementById("not").checked = true;
        }

        document.getElementById("diagnosticoPrevio").value =
          paciente.Diag_previos || "";
        document.getElementById("eps").value = paciente.eps || "";
        document.getElementById("medicActual").value =
          paciente.tel_emergencia || "";
        document.getElementById("respuesta_extra").value =
          paciente.aten_porque || "";
        document.getElementById("alergias").value = paciente.alergias || "";
        document.getElementById("motivoConsulta").value =
          paciente.motivo_consulta || "";
        // Cargar checkboxes de síntomas
        if (paciente.sintomas) {
          const sintomas = paciente.sintomas.split(",");
          sintomas.forEach((sintoma) => {
            const checkbox = document.getElementById(sintoma.trim()); // trim() por si hay espacios
            if (checkbox) checkbox.checked = true;
          });
        }

        if (paciente.antec_familiares === "Si") {
          document.getElementById("si").checked = true;
        } else if (paciente.aten_psicologica === "no") {
          document.getElementById("no").checked = true;
        }

        document.getElementById("respuesta_extra1").value =
          paciente.cuales || "";

        if (paciente.pensam_suicidas === "Si") {
          document.getElementById("s").checked = true;
        } else if (paciente.aten_psicologica === "no") {
          document.getElementById("n").checked = true;
        }
        document.getElementById("respuesta_extra2").value =
          paciente.apoyo_tratamiento || "";
        document.getElementById("consumoSustancias").value =
          paciente.consum_sustancia || "";
        document.getElementById("calidadSueno").value =
          paciente.calidad_sueño || "";
        document.getElementById("observaciones").value =
          paciente.observaciones || "";

        document.getElementById("id_paciente").value = paciente.id;

        if (historia) {
          document.getElementById("historiaFamiliar").value =
            historia.histFamiliar || "";
          document.getElementById("historiaPersonal").value =
            historia.historiaPersonal || "";
          document.getElementById("signosSintomas").value =
            historia.signoSintoma || "";
          document.getElementById("apertPsicologica").value =
            historia.aperPsicológica || "";
          document.getElementById("DSM-5").value = historia.Dsm5 || "";
          document.getElementById("CIE-10").value = historia.Cie10;
          document.getElementById("metaTerapeuta").value =
            historia.MeTerapeuta || "";
          document.getElementById("planTratamiento").value =
            historia.planTratamiento || "";
          document.getElementById("evoPaciente").value =
            historia.evoPaciente || "";
        } else {
          document.getElementById("historiaFamiliar").value = "";
          document.getElementById("historiaPersonal").value = "";
          document.getElementById("signosSintomas").value = "";
          document.getElementById("apertPsicologica").value = "";
          document.getElementById("DSM-5").value = "";
          document.getElementById("CIE-10").value = "";
          document.getElementById("metaTerapeuta").value = "";
          document.getElementById("planTratamiento").value = "";
          document.getElementById("evoPaciente").value = "";
        }
      } else {
        alert("Paciente no encontrado");
      }
    })
    .catch((error) => {
      console.error("Error al buscar historia", error);
    });
}

// Llenar campos y habilitarlos

/*document.getElementById("nombre").value = paciente.nombre;
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

      document.getElementById("tipoId").value = paciente.tipo_identificacion;
      document.getElementById("numeroId").value = paciente.num_identific;
      document.getElementById("telefono").value = paciente.telefono;
      document.getElementById("email").value = paciente.email;
      document.getElementById("direccion").value = paciente.address;
      document.getElementById("ocupacion").value = paciente.ocupacion;
      document.getElementById("perContacto").value = paciente.Nom_emergencia;
      document.getElementById("numeroCont").value = paciente.tel_emergencia;

      if (paciente.aten_psicologica === "Si") {
        document.getElementById("yes").checked = true;
      } else if (paciente.aten_psicologica === "no") {
        document.getElementById("not").checked = true;
      }

      document.getElementById("diagnosticoPrevio").value =
        paciente.Diag_previos;
      document.getElementById("eps").value = paciente.eps;
      document.getElementById("medicActual").value = paciente.tel_emergencia;
      document.getElementById("respuesta_extra").value = paciente.aten_porque;
      document.getElementById("alergias").value = paciente.alergias;
      document.getElementById("motivoConsulta").value =
        paciente.motivo_consulta;

      // Cargar checkboxes de síntomas
      if (paciente.sintomas) {
        const sintomas = paciente.sintomas.split(",");
        sintomas.forEach((sintoma) => {
          const checkbox = document.getElementById(sintoma.trim()); // trim() por si hay espacios
          if (checkbox) checkbox.checked = true;
        });
      }

      if (paciente.antec_familiares === "Si") {
        document.getElementById("si").checked = true;
      } else if (paciente.aten_psicologica === "no") {
        document.getElementById("no").checked = true;
      }

      document.getElementById("respuesta_extra1").value = paciente.cuales;

      if (paciente.pensam_suicidas === "Si") {
        document.getElementById("s").checked = true;
      } else if (paciente.aten_psicologica === "no") {
        document.getElementById("n").checked = true;
      }
      document.getElementById("respuesta_extra2").value =
        paciente.apoyo_tratamiento;
      document.getElementById("consumoSustancias").value =
        paciente.consum_sustancia;
      document.getElementById("calidadSueno").value = paciente.calidad_sueño;
      document.getElementById("observaciones").value = paciente.observaciones;

      document.getElementById("id_paciente").value = paciente.Id_Paciente;

      // Habilitar campos de agendamiento y cambiar botones
      document.getElementById("form_historia").style.display = "grid";
      btnBuscar.style.display = "none"; // Ocultar buscar
      buscar.style.display = "none"; //Oculata el buscador
      btnGuardar.style.display = "block"; // Mostrar guardar
      btnEditar.style.display = "block"; //mostrar editar
    })
    .catch((err) => {
      console.error("Error al buscar paciente:", err);
      alert("Ocurrió un error al buscar el paciente.");
    });
}

// Función para resetear el formulario
function limpiarFormulario() {
  document.getElementById("btnBuscar").style.display = "block";
  document.getElementById("buscador").style.display = "block";
  document.getElementById("btnGuardar").style.display = "none";
  document.getElementById("editar").style.display = "none";
  document.getElementById("form_historia").style.display = "none";
}*/
