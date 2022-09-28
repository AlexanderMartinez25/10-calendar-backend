const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  // x-token headers
  const token = req.header("x-token");
  if (!token) {
    return res.status(400).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const { name, uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    // la request que recibimos, tabmién se envía n el next
    req.uid = uid;
    req.name = name;
  } catch (error) {
    return req.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }

  next();
};

module.exports = {
  validarJWT,
};
