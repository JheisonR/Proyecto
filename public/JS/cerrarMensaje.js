// Cerrar el mensaje cuando el usuario hace clic en la "X"
const cerrarMensaje = document.getElementById("cerrarMensaje");
if (cerrarMensaje) {
  cerrarMensaje.addEventListener("click", function () {
    const mensaje = document.getElementById("mensaje");
    if (mensaje) {
      mensaje.style.display = "none"; // Oculta el mensaje
    }
  });
}

// Ocultar el mensaje después de 5 segundos (5000 milisegundos)
setTimeout(function () {
  const mensaje = document.getElementById("mensaje");
  if (mensaje) {
    mensaje.style.display = "none"; // Oculta el mensaje
  }
}, 5000); // Cambia el tiempo según lo necesites
