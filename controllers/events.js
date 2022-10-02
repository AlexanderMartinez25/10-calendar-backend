const { response } = require("express");
const Evento = require("../models/Evento");

const getEventos = async (req, res = response) => {
  return res.status(201).json({
    ok: true,
    msg: "getEventos",
  });
};

const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);

  try {
    // el id del usuario ya viene por defecto en la req
    // asi que se lo asignamos al evento
    evento.user = req.uid;

    const eventoGuardado = await evento.save();

    res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
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
