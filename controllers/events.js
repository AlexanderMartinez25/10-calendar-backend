const { response } = require("express");

const getEventos = async (req, res = response) => {
  return res.status(201).json({
    ok: true,
    msg: "getEventos",
  });
};

const crearEvento = async (req, res = response) => {
  return res.status(201).json({
    ok: true,
    msg: "crearEvento",
  });
};

const actualizarEvento = async (req, res = response) => {
  const { id } = req.params;
  console.log(id);

  return res.status(201).json({
    ok: true,
    msg: "actualizarEvento",
  });
};

const eliminarEvento = async (req, res = response) => {
  const { id } = req.params;
  console.log(id);

  return res.status(201).json({
    ok: true,
    msg: "eliminarEvento",
  });
};

module.exports = {
  actualizarEvento,
  crearEvento,
  eliminarEvento,
  getEventos,
};
