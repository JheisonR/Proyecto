//importar librerias
const express = require("express");
const session = require("express-session");
const app = express();
const link = require("./config/link");

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
//Proteger rutas
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

//rutas dinamicas y estaticas::::::::::::::::::::::
app.use(express.static("public"));
app.use(require("./rutas/index"));
app.use(require("./rutas/regUsuario"));
app.use(require("./rutas/codLogin"));
app.use(require("./rutas/Bienvenido"));
app.use(require("./rutas/crearCita"));
app.use(require("./rutas/regPaciente"));
app.use(require("./rutas/buscar_cita"));

app.get("/registro", (req, res) => {
  res.render("registro");
});
app.get("/index", (req, res) => {
  res.render("index");
});
app.get("/Bienvenido", (req, res) => {
  if (!req.session.login) {
    return res.redirect("/index");
  }
  res.render("Binvenido", {
    datos: req.session,
    link,
  });
});

app.get("/regPaciente", (req, res) => {
  if (!req.session.login) {
    return res.redirect("/index");
  }
  res.render("Registro Paciente", {
    datos: req.session,
    link,
  });
});

app.get("/crearCita", (req, res) => {
  if (!req.session.login) {
    return res.redirect("/index");
  }
  res.render("Crear Cita", {
    datos: req.session,
    link,
  });
});

app.get("/buscar_cita", (req, res) => {
  if (!req.session.login) {
    return res.redirect("/index");
  }
  res.render("Consultar Cita", {
    datos: req.session,
    link,
  });
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
