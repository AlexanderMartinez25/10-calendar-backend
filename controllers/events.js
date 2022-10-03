const { response } = require("express");
const Evento = require("../models/Evento");

const getEventos = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name");

  return res.status(201).json({
    ok: true,
    eventos,
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
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese id",
      });
    }

    // si un usuario quiere modificar la nota de otro usuario
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no tiene privilegio de editar este evento",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventId,
      nuevoEvento,
      // para que retorne los cambios actualizados
      { new: true }
    );

    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const eliminarEvento = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese id",
      });
    }

    // si un usuario quiere modificar la nota de otro usuario
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no tiene privilegio de eliminar este evento",
      });
    }

    await Evento.findOneAndDelete(eventId);
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  actualizarEvento,
  crearEvento,
  eliminarEvento,
  getEventos,
};
