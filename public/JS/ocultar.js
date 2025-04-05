document.addEventListener("DOMContentLoaded", function () {
  // Obtener los elementos del formulario
  const radioSi = document.getElementById("yes");
  const radioNo = document.getElementById("not");
  const preguntaExtra = document.getElementById("pregunta_extra");
  const respuestaExtra = document.getElementById("respuesta_extra");

  // Función para mostrar/ocultar la pregunta extra
  function togglePreguntaExtra() {
    if (radioSi.checked) {
      preguntaExtra.style.display = "block";
      respuestaExtra.required = true; // Hace que la respuesta sea obligatoria si selecciona "Sí"
    } else {
      preguntaExtra.style.display = "none";
      respuestaExtra.required = false; // Evita que sea obligatorio si selecciona "No"
      respuestaExtra.value = ""; // Borra el texto si el usuario cambia de opción
    }
  }

  // Agregar eventos a los radio buttons
  radioSi.addEventListener("change", togglePreguntaExtra);
  radioNo.addEventListener("change", togglePreguntaExtra);
});

//otro

document.addEventListener("DOMContentLoaded", function () {
  // Obtener los elementos del formulario
  const radioSi = document.getElementById("si");
  const radioNo = document.getElementById("no");
  const preguntaExtra = document.getElementById("pregunta_extra1");
  const respuestaExtra = document.getElementById("respuesta_extra1");

  // Función para mostrar/ocultar la pregunta extra
  function togglePreguntaExtra() {
    if (radioSi.checked) {
      preguntaExtra.style.display = "block";
      respuestaExtra.required = true; // Hace que la respuesta sea obligatoria si selecciona "Sí"
    } else {
      preguntaExtra.style.display = "none";
      respuestaExtra.required = false; // Evita que sea obligatorio si selecciona "No"
      respuestaExtra.value = ""; // Borra el texto si el usuario cambia de opción
    }
  }

  // Agregar eventos a los radio buttons
  radioSi.addEventListener("change", togglePreguntaExtra);
  radioNo.addEventListener("change", togglePreguntaExtra);
});

// otro

document.addEventListener("DOMContentLoaded", function () {
  // Obtener los elementos del formulario
  const radioSi = document.getElementById("s");
  const radioNo = document.getElementById("n");
  const preguntaExtra = document.getElementById("pregunta_extra2");
  const respuestaExtra = document.getElementById("respuesta_extra2");

  // Función para mostrar/ocultar la pregunta extra
  function togglePreguntaExtra() {
    if (radioSi.checked) {
      preguntaExtra.style.display = "block";
      respuestaExtra.required = true; // Hace que la respuesta sea obligatoria si selecciona "Sí"
    } else {
      preguntaExtra.style.display = "none";
      respuestaExtra.required = false; // Evita que sea obligatorio si selecciona "No"
      respuestaExtra.value = ""; // Borra el texto si el usuario cambia de opción
    }
  }

  // Agregar eventos a los radio buttons
  radioSi.addEventListener("change", togglePreguntaExtra);
  radioNo.addEventListener("change", togglePreguntaExtra);
});
