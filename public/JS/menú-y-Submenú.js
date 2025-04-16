// Mostrar/ocultar el menú principal
document.getElementById("MenuButton").addEventListener("click", function () {
  var menu = document.getElementById("myMenu");
  menu.classList.toggle("show");
});

// Mostrar/ocultar submenús
const submenuButtons = document.querySelectorAll(".submenu-button");
submenuButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const submenu = this.nextElementSibling;

    // Alternar la visibilidad del submenú
    const allSubmenus = document.querySelectorAll(".submenu-content");
    allSubmenus.forEach((otherSubmenu) => {
      if (otherSubmenu !== submenu && otherSubmenu.classList.contains("show")) {
        otherSubmenu.classList.remove("show");
        otherSubmenu.previousElementSibling.classList.remove("active"); // Remover el color del título
      }
    });

    // Mostrar/ocultar el submenú actual y cambiar el color del título
    submenu.classList.toggle("show");

    if (submenu.classList.contains("show")) {
      this.classList.add("active");
    } else {
      this.classList.remove("active");
    }
  });
});

// Cerrar los menús si se hace clic fuera de ellos
window.onclick = function (event) {
  if (
    !event.target.matches("#MenuButton") &&
    !event.target.matches(".submenu-button")
  ) {
    // Cerrar menú principal
    var dropdowns = document.getElementsByClassName("menu-contenido");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }

    // Cerrar submenús
    var submenus = document.getElementsByClassName("submenu-contenido");
    for (var i = 0; i < submenus.length; i++) {
      var openSubmenu = submenus[i];
      if (openSubmenu.classList.contains("show")) {
        openSubmenu.classList.remove("show");
        openSubmenu.previousElementSibling.classList.remove("active"); // Remover el color del título activo
      }
    }
  }
};
