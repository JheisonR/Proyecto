document.getElementById("logoutBtn").addEventListener("click", () => {
  if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
    // Enviar solicitud POST al servidor
    fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url; // Redirigir al login
        }
      })
      .catch((error) => console.error("Error:", error));
  }
});
