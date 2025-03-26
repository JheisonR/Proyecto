document.addEventListener("DOMContentLoaded", function () {
  const suicidioSi = document.getElementById("suicidio_si");
  const suicidioNo = document.getElementById("suicidio_no");
  const tratamientoDiv = document.getElementById("tratamiento_suicidio");

  const atencionSi = document.getElementById("atencion_si");
  const atencionNo = document.getElementById("atencion_no");
  const detalleAtencionDiv = document.getElementById("detalle_atencion");

  // Mostrar campo de tratamiento si selecciona "Sí" en pensamientos suicidas
  suicidioSi.addEventListener("change", function () {
    tratamientoDiv.classList.remove("hidden");
  });

  suicidioNo.addEventListener("change", function () {
    tratamientoDiv.classList.add("hidden");
  });

  // Mostrar campo de detalles de atención previa si selecciona "Sí"
  atencionSi.addEventListener("change", function () {
    detalleAtencionDiv.classList.remove("hidden");
  });

  atencionNo.addEventListener("change", function () {
    detalleAtencionDiv.classList.add("hidden");
  });

  // Manejo del envío del formulario
  document
    .getElementById("registroForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      let nombre = document.getElementById("nombre").value.trim();
      let fechaNacimiento = document.getElementById("fecha_nacimiento").value;
      let genero = document.getElementById("genero").value;
      let motivo = document.getElementById("motivo").value.trim();
      let consentimiento = document.getElementById("consentimiento").checked;

      if (
        !nombre ||
        !fechaNacimiento ||
        !genero ||
        !motivo ||
        !consentimiento
      ) {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
      }

      document.getElementById("mensaje").textContent = "Registro exitoso 🎉";
      document.getElementById("registroForm").reset();
      tratamientoDiv.classList.add("hidden");
      detalleAtencionDiv.classList.add("hidden");
    });
});
