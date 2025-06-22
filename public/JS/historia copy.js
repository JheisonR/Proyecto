function buscarPaciente() {
  const tipoId = document.getElementById("tipoId").value;
  const numeroId = document.getElementById("numeroId").value;
  const btnBuscar = document.getElementById("btnBuscar");
  const btnGuardar = document.getElementById("btnGuardar");
  const btnEditar = document.getElementById("editar");

  fetch("/buscarPaciente", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tipoId, numeroId }),
  })
    .then((res) => res.json())
    .then((respuesta) => {
      if (respuesta.error) {
        alert(respuesta.error);
        return;
      }

      const paciente = respuesta;
      const historia = respuesta.historiaClinica;

      // Llenar campos y habilitarlos

      document.getElementById("nombre").value = paciente.nombre;
      document.getElementById("primerApellido").value = paciente.prim_apellido;
      document.getElementById("segundoApellido").value = paciente.segu_apellido;
      document.getElementById("fechaNacimiento").value =
        paciente.fecha_nacimiento.slice(0, 10);
      document.getElementById("lugarNacimiento").value =
        paciente.lugar_nacimiento;
      document.getElementById("estadoCivil").value = paciente.estado_civil;
      document.getElementById("edad").value = paciente.edad;

      // Establecer el tipo de identificación - Versión robusta
      if (paciente.tipo_identificacion) {
        const tipoId = paciente.tipo_identificacion
          .toString()
          .toLowerCase()
          .trim();

        // Obtener el elemento select
        const selectElement = document.getElementById("tipoId");

        // Buscar la opción que coincida con el valor
        for (let i = 0; i < selectElement.options.length; i++) {
          if (selectElement.options[i].value === tipoId) {
            selectElement.selectedIndex = i;
            break;
          }
        }

        // Opcional: Validar si se encontró una coincidencia
        if (selectElement.value !== tipoId) {
          console.warn(
            `Valor de tipo_identificacion no encontrado en las opciones: ${tipoId}`
          );
        }
      }

      // Sexo
      if (paciente.sexo === "masculino") {
        document.getElementById("masculino").checked = true;
      } else if (paciente.sexo === "femenino") {
        document.getElementById("femenino").checked = true;
      }

      document.getElementById("telefono").value = paciente.telefono;
      document.getElementById("email").value = paciente.email;
      document.getElementById("direccion").value = paciente.address;
      document.getElementById("ocupacion").value = paciente.ocupacion;
      document.getElementById("perContacto").value = paciente.Nom_emergencia;
      document.getElementById("numeroCont").value = paciente.tel_emergencia;

      // Versión corregida para manejar los radio buttons
      if (paciente.aten_psicologica) {
        const atencionPrevia = paciente.aten_psicologica.toLowerCase(); // Convertir a minúscula para comparación

        if (atencionPrevia === "si") {
          document.getElementById("yes").checked = true;
        } else if (atencionPrevia === "no") {
          document.getElementById("not").checked = true;
        }
      }

      document.getElementById("diagnosticoPrevio").value =
        paciente.Diag_previos;
      document.getElementById("eps").value = paciente.eps;
      document.getElementById("medicActual").value = paciente.medic_actual;
      // 1. Manejar los radio buttons de atención psicológica
      if (paciente.aten_psicologica) {
        const atencionPrevia = paciente.aten_psicologica.toLowerCase();

        if (atencionPrevia === "si") {
          document.getElementById("yes").checked = true;
          // Mostrar el campo adicional cuando es "Sí"
          document.getElementById("pregunta_extra").style.display = "block";
          document.getElementById("respuesta_extra").value =
            paciente.aten_porque || "";
        } else if (atencionPrevia === "no") {
          document.getElementById("not").checked = true;
          // Ocultar el campo adicional cuando es "No"
          document.getElementById("pregunta_extra").style.display = "none";
        }
      }

      // 2. Añadir event listeners para cambiar dinámicamente
      document
        .querySelectorAll('input[name="atencion_psicologica"]')
        .forEach((radio) => {
          radio.addEventListener("change", function () {
            const preguntaExtra = document.getElementById("pregunta_extra");
            const respuestaExtra = document.getElementById("respuesta_extra");

            if (this.value === "si" && this.checked) {
              preguntaExtra.style.display = "block";
              respuestaExtra.required = true;
            } else {
              preguntaExtra.style.display = "none";
              respuestaExtra.required = false;
              respuestaExtra.value = ""; // Limpiar el campo al ocultarlo
            }
          });
        });
      document.getElementById("alergias").value = paciente.alergias;
      document.getElementById("motivoConsulta").value =
        paciente.motivo_consulta;

      // Cargar checkboxes de síntomas y campo "Otro"
      if (paciente.sintomas) {
        // 1. Desmarcar todos los checkboxes primero
        document
          .querySelectorAll('input[type="checkbox"][name="sintomas"]')
          .forEach((checkbox) => {
            checkbox.checked = false;
          });

        // 2. Limpiar el campo "Otro"
        document.getElementById("otro").value = "";

        // 3. Separar los síntomas y procesarlos
        const sintomasArray = paciente.sintomas
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s !== "");

        // 4. Identificar todos los valores de checkboxes existentes
        const valoresCheckboxes = Array.from(
          document.querySelectorAll('input[type="checkbox"][name="sintomas"]')
        ).map((checkbox) => checkbox.value);

        // 5. Separar entre síntomas con checkbox y otros síntomas
        const otrosSintomas = [];

        sintomasArray.forEach((sintoma) => {
          if (valoresCheckboxes.includes(sintoma)) {
            // Marcar el checkbox correspondiente
            document.querySelector(
              `input[type="checkbox"][value="${sintoma}"]`
            ).checked = true;
          } else {
            // Agregar a otros síntomas
            otrosSintomas.push(sintoma);
          }
        });

        // 6. Llenar el campo "Otro" si hay síntomas no listados
        if (otrosSintomas.length > 0) {
          document.getElementById("otro").value = otrosSintomas.join(", ");
        }
      }

      // Manejo de antecedentes familiares -
      if (paciente.antec_familiares) {
        // Convertir a minúscula y trim para eliminar espacios
        const respuesta = paciente.antec_familiares
          .toString()
          .toLowerCase()
          .trim();

        if (respuesta === "si") {
          document.getElementById("si").checked = true;
        } else if (respuesta === "no") {
          document.getElementById("no").checked = true;
        }
      }

      // 1. Manejar los radio buttons de antecedentes familiares
      if (paciente.antec_familiares) {
        const respuesta = paciente.antec_familiares
          .toString()
          .toLowerCase()
          .trim();

        if (respuesta === "si") {
          document.getElementById("si").checked = true;
          // Mostrar el campo adicional cuando es "Sí"
          document.getElementById("pregunta_extra1").style.display = "block";
          document.getElementById("respuesta_extra1").value =
            paciente.cuales || "";
        } else if (respuesta === "no") {
          document.getElementById("no").checked = true;
          // Ocultar el campo adicional cuando es "No"
          document.getElementById("pregunta_extra1").style.display = "none";
        }
      }

      // 2. Añadir event listeners para cambiar dinámicamente
      document
        .querySelectorAll('input[name="antecFamiliares"]')
        .forEach((radio) => {
          radio.addEventListener("change", function () {
            const preguntaExtra = document.getElementById("pregunta_extra1");
            const respuestaExtra = document.getElementById("respuesta_extra1");

            if (this.value === "si" && this.checked) {
              preguntaExtra.style.display = "block";
              respuestaExtra.required = true;
            } else {
              preguntaExtra.style.display = "none";
              respuestaExtra.required = false;
              respuestaExtra.value = ""; // Limpiar el campo al ocultarlo
            }
          });
        });

      // Manejo de pensamientos suicidas
      if (paciente.pensam_suicidas) {
        const respuesta = paciente.pensam_suicidas
          .toString()
          .toLowerCase()
          .trim();

        // Resetear selección previa
        document
          .querySelectorAll('input[name="pensaSuicidas"]')
          .forEach((radio) => {
            radio.checked = false;
          });

        // Establecer nueva selección
        if (respuesta === "si") {
          document.getElementById("s").checked = true;
        } else if (respuesta === "no") {
          document.getElementById("n").checked = true;
        }
      }

      // Manejo de apoyo/tratamiento
      const apoyoTratamiento = paciente.apoyo_tratamiento;
      const preguntaExtra2 = document.getElementById("pregunta_extra2");
      const respuestaExtra2 = document.getElementById("respuesta_extra2");

      // Mostrar u ocultar según si hay datos
      if (apoyoTratamiento) {
        preguntaExtra2.style.display = "block";
        respuestaExtra2.value = apoyoTratamiento;
      } else {
        preguntaExtra2.style.display = "none";
        respuestaExtra2.value = "";
      }

      // Función para toggle dinámico (mejorada)
      function toggleApoyoTratamiento(mostrar) {
        const campo = document.getElementById("pregunta_extra2");
        const textarea = document.getElementById("respuesta_extra2");

        campo.style.display = mostrar ? "block" : "none";
        textarea.required = mostrar;

        if (!mostrar) {
          textarea.value = "";
        }
      }

      // Añadir event listener para cambios en pensamientos suicidas
      document
        .querySelectorAll('input[name="pensaSuicidas"]')
        .forEach((radio) => {
          radio.addEventListener("change", function () {
            if (this.value === "si" && this.checked) {
              // Mostrar campos relacionados si es necesario
              toggleApoyoTratamiento(true);
            } else {
              toggleApoyoTratamiento(false);
            }
          });
        });

      document.getElementById("consumoSustancias").value =
        paciente.consum_sustancia;
      document.getElementById("calidadSueno").value = paciente.calidad_sueño;
      document.getElementById("observaciones").value = paciente.observaciones;

      document.getElementById("id_paciente").value = paciente.Id_Paciente;

      //Llenar historia clínica si existe
      if (historia) {
        document.getElementById("historiaFamiliar").value =
          historia.histFamiliar;
        document.getElementById("historiaPersonal").value =
          historia.histPersonal;
        document.getElementById("signosSintomas").value = historia.signoSintoma;
        document.getElementById("apertPsicologica").value =
          historia.aperPsicologica;
        document.getElementById("Dsm5").value = historia.Dsm5;
        document.getElementById("Cie10").value = historia.Cie10;
        document.getElementById("metaTerapeuta").value = historia.MeTerapeuta;
        document.getElementById("planTratamiento").value =
          historia.planTratamiento;
        document.getElementById("evoPaciente").value = historia.evoPaciente;
      }

      // Actualización
      // Reemplaza tu evento de submit del formulario con esto:
      document
        .getElementById("formHistoria")
        .addEventListener("submit", function (e) {
          e.preventDefault();

          // Recoger todos los datos del formulario
          const formData = new FormData(this);
          const data = {};

          // Convertir FormData a objeto simple
          formData.forEach((value, key) => {
            // Manejar checkboxes de síntomas
            if (key === "sintomas") {
              data[key] = data[key] ? `${data[key]}, ${value}` : value;
            } else {
              data[key] = value;
            }
          });

          // Asegurar que los campos de radio estén incluidos
          data.aten_psicologica =
            document.querySelector('input[name="atencion_psicologica"]:checked')
              ?.value || "";
          data.antec_familiares =
            document.querySelector('input[name="antecFamiliares"]:checked')
              ?.value || "";
          data.pensam_suicidas =
            document.querySelector('input[name="pensaSuicidas"]:checked')
              ?.value || "";

          // Enviar datos al servidor
          fetch("/historiaClinica", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => {
              if (response.redirected) {
                window.location.href = response.url;
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Error al guardar los datos");
            });
        });

      // Habilitar campos de agendamiento y cambiar botones
      document.getElementById("form_historia").style.display = "grid";
      btnBuscar.style.display = "none"; // Ocultar buscar
      btnGuardar.style.display = "block"; // Mostrar guardar
      btnEditar.style.display = "block"; // Mostrar editar
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

// Función para boton editar, habilita las casillas en desabled

document.getElementById("editar").addEventListener("click", function () {
  // Selecciona todos los campos del formulario que estén deshabilitados
  const camposDeshabilitados = document.querySelectorAll(
    "#formHistoria input:disabled, #formHistoria select:disabled, #formHistoria textarea:disabled"
  );

  // Habilita cada uno
  camposDeshabilitados.forEach((campo) => {
    campo.disabled = false;
  });

  // Opcional: Cambiar el texto del botón "Guardar"
  const btnGuardar = document.getElementById("btnGuardar");
  if (btnGuardar) {
    btnGuardar.disabled = false; // Asegúrate de que se pueda guardar
  }
});
