const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  // lareferencia al modelo usuario con su id
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

// modificar lo que devuelve el Schema (_id) por id y ("val")
EventoSchema.method("toJSON", function () {
  const { __V, _id, ...object } = this.Object();

  object.id = _id;
  return object;
});

module.exports = model("Evento", EventoSchema);
