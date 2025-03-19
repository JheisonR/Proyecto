//importar librerias
const express = require("express");
const session = require("express-session");
const app = express();

//configuraciones
app.set("view engine", "ejs"); //páginas dinámicas
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//manejo de sesiones
app.use(
  session({
    secret: "tu contraseña",
    resave: false,
    saveUninitialized: false,
  })
);
//fin de manejo de sesión

//rutas dinamicas y estaticas::::::::::::::::::::::
app.use(express.static("public"));
app.use(require("./rutas/index"));
app.use(require("./rutas/regUsuario"));
app.use(require("./rutas/codLogin"));
app.use(require("./rutas/Bienvenido"));
app.use(require("./rutas/crearCita"));
app.get("/registro", (req, res) => {
  res.render("registro");
});
app.get("/index", (req, res) => {
  res.render("index");
});
app.get("/crearCita", (req, res) => {
  res.render("Crear Cita");
});

//configurando el puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  if (PORT == 3000) {
    console.log("http://localhost:3000");
  } else {
    console.log(PORT);
  }
});
