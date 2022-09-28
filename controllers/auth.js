const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario existe con ese correo",
      });
    }

    usuario = new Usuario(req.body);

    //Encriptar password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    res.status(201).json({
      ok: true,
      name: usuario.name,
      uid: usuario.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el admin del servidor",
    });
  }

  res.status(201).json({
    ok: true,
    msg: "registro",
  });
};

const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese email",
      });
    }

    //confirmar los password
    const validaPassword = bcrypt.compareSync(password, usuario.password);

    if (!validaPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    // Generar nuestro JWT
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el admin del servidor",
    });
  }
};

const revalidarToken = (req, res) => {
  res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
