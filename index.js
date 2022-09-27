const express = require("express");
require("dotenv").config();

// Crear servidor express
const app = express();

// Directorio Público
app.use(express.static("public"));

// Rutas
app.use("/api/auth", require("./routes/auth"));
// TODO: CRUD: Eventos

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en pruerto ${process.env.PORT}`);
});
