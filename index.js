const express = require("express");
require("dotenv").config();

// Crear servidor express
const app = express();

// Directorio Público
app.use(express.static("public"));

// Rutas
// app.get("/", (req, res) => {
//   res.json({
//     ok: true,
//   });
// });

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en pruerto ${process.env.PORT}`);
});
