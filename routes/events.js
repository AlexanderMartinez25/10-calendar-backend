/*
  Events routes
  /api/events
*/

const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const { Router } = require("express");
const router = Router();

// Todas las peticiones tienen que pasar por la validación de JWT
router.use(validarJWT);

// Obtener eventos
router.get("/", getEventos);

// Crear un nuevo evento
router.post("/", crearEvento);

// Actualizar evento
router.put("/:id", actualizarEvento);

// Borrar evento
router.delete("/:id", eliminarEvento);

module.exports = router;
