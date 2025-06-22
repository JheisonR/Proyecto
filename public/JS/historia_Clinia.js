async function buscarPaciente() {
  const tipoId = document.getElementById("tipoId").value;
  const numeroId = document.getElementById("numeroId").value;

  const respuesta = await fetch("/historiaClinica/buscar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tipoId, numeroId }),
  });

  const data = await respuesta.json();

  if (!data.encontrado) {
    alert("Paciente no encontrado.");
    return;
  }

  const p = data.paciente;
  const h = data.historia || {};

  // Datos personales
  document.getElementById("id_paciente").value = p.Id_Paciente;
  document.getElementById("nombre").value = p.nombre;
  document.getElementById("primerApellido").value = p.prim_apellido;
  document.getElementById("segundoApellido").value = p.segu_apellido;
  if (p.sexo) {
    const sexoRadio = document.querySelector(
      `input[name="sexo"][value="${p.sexo}"]`
    );
    if (sexoRadio) sexoRadio.checked = true;
  }
  document.getElementById("tipoId").value = p.tipo_identificacion;
  document.getElementById("numeroId").value = p.num_identific;
  document.getElementById("fechaNacimiento").value =
    p.fecha_nacimiento?.split("T")[0] || "";
  document.getElementById("lugarNacimiento").value = p.lugar_nacimiento;
  document.getElementById("estadoCivil").value = p.estado_civil;
  document.getElementById("edad").value = p.edad;

  // Datos contacto
  document.getElementById("telefono").value = p.telefono;
  document.getElementById("email").value = p.email;
  document.getElementById("direccion").value = p.address;
  document.getElementById("ocupacion").value = p.ocupacion;
  document.getElementById("perContacto").value = p.Nom_emergencia;
  document.getElementById("numeroCont").value = p.tel_emergencia;

  // Información médica y psicológica
  // CORREGIR RADIO: atención psicológica previa
  if (p.aten_psicologica) {
    document.querySelectorAll(`input[name="infoMedica"]`).forEach((radio) => {
      if (radio.value.toLowerCase() === p.aten_psicologica.toLowerCase()) {
        radio.checked = true;

        // Si es "Sí", mostrar la pregunta extra
        if (radio.value.toLowerCase() === "si") {
          document.getElementById("pregunta_extra").style.display = "block";
        } else {
          document.getElementById("pregunta_extra").style.display = "none";
        }
      }
    });
  }

  // Rellenar campo extra (aunque esté oculto inicialmente)
  document.getElementById("respuesta_extra").value = p.aten_porque || "";
  document.getElementById("diagnosticoPrevio").value = p.Diag_previos;
  document.getElementById("eps").value = p.eps;
  document.getElementById("medicActual").value = p.medic_actual;
  document.getElementById("alergias").value = p.alergias;
  document.getElementById("motivoConsulta").value = p.motivo_consulta;

  document
    .querySelectorAll('input[name="sintomas"]')
    .forEach((chk) => (chk.checked = false));
  document.getElementById("otro").value = "";

  if (p.sintomas) {
    const sintomas = p.sintomas.split(",").map((s) => s.trim().toLowerCase());

    const checkboxElements = Array.from(
      document.querySelectorAll('input[name="sintomas"]')
    );
    const valoresCheckbox = checkboxElements.map((c) => c.value.toLowerCase());

    sintomas.forEach((sintoma) => {
      const checkbox = checkboxElements.find(
        (c) => c.value.toLowerCase() === sintoma
      );
      if (checkbox) {
        checkbox.checked = true;
      } else {
        // Si no coincide con ningún checkbox, ponerlo como "Otro"
        document.getElementById("otro").value += document.getElementById("otro")
          .value
          ? `, ${sintoma}`
          : sintoma;
      }
    });
  }
  // Antecedentes
  if (p.antec_familiares) {
    document
      .querySelectorAll(`input[name="antecFamiliares"]`)
      .forEach((radio) => {
        if (radio.value.toLowerCase() === p.antec_familiares.toLowerCase()) {
          radio.checked = true;

          if (radio.value.toLowerCase() === "si") {
            document.getElementById("pregunta_extra1").style.display = "block";
          } else {
            document.getElementById("pregunta_extra1").style.display = "none";
          }
        }
      });
  }
  document.getElementById("respuesta_extra1").value = p.cuales || "";

  // Pensamientos Suicidas
  if (p.pensam_suicidas) {
    document
      .querySelectorAll(`input[name="pensaSuicidas"]`)
      .forEach((radio) => {
        if (radio.value.toLowerCase() === p.pensam_suicidas.toLowerCase()) {
          radio.checked = true;

          if (radio.value.toLowerCase() === "si") {
            document.getElementById("pregunta_extra2").style.display = "block";
          } else {
            document.getElementById("pregunta_extra2").style.display = "none";
          }
        }
      });
  }
  document.getElementById("respuesta_extra2").value = p.apoyo_tratamiento || "";
  document.getElementById("consumoSustancias").value = p.consum_sustancia;
  document.getElementById("calidadSueno").value = p.calidad_sueño;
  document.getElementById("observaciones").value = p.observaciones;
  // Historia clínica (si hay)
  document.getElementById("form_historia").style.display = "block";
  document.getElementById("historiaFamiliar").value = h.histFamiliar || "";
  document.getElementById("historiaPersonal").value = h.histPersonal || "";
  document.getElementById("signosSintomas").value = h.signoSintoma || "";
  document.getElementById("apertPsicologica").value = h.aperPsicologica || "";
  document.getElementById("Dsm5").value = h.Dsm5 || "";
  document.getElementById("Cie10").value = h.Cie10 || "";
  document.getElementById("metaTerapeuta").value = h.MeTerapeuta || "";
  document.getElementById("planTratamiento").value = h.planTratamiento || "";
  document.getElementById("evoPaciente").value = h.evoPaciente || "";

  // Mostrar botón Editar
  document.getElementById("editar").style.display = "inline-block";
}

function habilitarEdicion() {
  document
    .querySelectorAll(
      "#formHistoria input, #formHistoria select, #formHistoria textarea"
    )
    .forEach((el) => {
      if (!["tipoId", "numeroId"].includes(el.id)) el.disabled = false;
    });
  document.getElementById("btnGuardar").style.display = "inline-block";
  document.getElementById("btnGuardar").style.display = "inline-block";
  document.getElementById("btnBuscar").style.display = "none";
  document.getElementById("editar").style.display = "none";
}

// Función para resetear el formulario
function limpiarFormulario() {
  document.getElementById("btnBuscar").style.display = "block";
  document.getElementById("btnGuardar").style.display = "none";
  document.getElementById("editar").style.display = "none";
  document.getElementById("form_historia").style.display = "none";
  // Selecciona todos los campos del formulario que estén deshabilitados
  const camposHabilitados = document.querySelectorAll(
    "#formHistoria input:not(#numeroId), #formHistoria select:not(#tipoId), #formHistoria textarea"
  );

  // Habilita cada uno
  camposHabilitados.forEach((campo) => {
    campo.disabled = true;
  });
}
