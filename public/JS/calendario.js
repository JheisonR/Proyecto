document.addEventListener("DOMContentLoaded", () => {
  const monthYear = document.getElementById("monthYear");
  const daysGrid = document.querySelector(".days-grid");
  const prevMonthButton = document.getElementById("prevMonth");
  const nextMonthButton = document.getElementById("nextMonth");

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  // Datos de ejemplo: días con citas ocupadas o canceladas
  const citas = {
    "2024-10-05": "occupied", // Cita ocupada
    "2024-10-12": "occupied",
    "2024-10-19": "canceled", // Cita cancelada
    "2024-10-25": "occupied",
  };

  // Función para renderizar el calendario
  function renderCalendar(month, year) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    // Obtener el nombre del mes y capitalizar la primera letra
    const monthName = firstDay.toLocaleString("es", { month: "long" });
    const capitalizedMonthName =
      monthName.charAt(0).toUpperCase() + monthName.slice(1);

    monthYear.textContent = `${capitalizedMonthName} ${year}`;
    daysGrid.innerHTML = "";

    // Días de la semana
    ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].forEach((day) => {
      const dayName = document.createElement("div");
      dayName.className = "day-name";
      dayName.textContent = day;
      daysGrid.appendChild(dayName);
    });

    // Espacios vacíos al inicio del mes
    for (let i = 0; i < startDay; i++) {
      const emptyDay = document.createElement("div");
      emptyDay.className = "day";
      daysGrid.appendChild(emptyDay);
    }

    // Días del mes
    const today = new Date(); // Fecha actual
    const isCurrentMonth =
      today.getMonth() === month && today.getFullYear() === year;

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split("T")[0];
      const dayElement = document.createElement("div");
      dayElement.className = "day";

      // Marcar el día actual
      if (isCurrentMonth && day === today.getDate()) {
        dayElement.classList.add("today");
      }

      dayElement.textContent = day;

      if (citas[dateString]) {
        dayElement.classList.add(citas[dateString]);
      }

      daysGrid.appendChild(dayElement);
    }
  }

  // Navegación entre meses
  prevMonthButton.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
  });

  nextMonthButton.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
  });

  // Renderizar el calendario inicial
  renderCalendar(currentMonth, currentYear);
});
