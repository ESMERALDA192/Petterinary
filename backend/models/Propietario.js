const mongoose = require("mongoose");

const propietarioSchema = new mongoose.Schema({
    nombrePropietario: { type: String, required: true },
    apellidosPropietario: { type: String, required: true },
    telPropietario: { type: String, required: true },
    emailPropietario: { type: String, required: true },
    direccionPropietario: { type: String, required: true }
});

module.exports = mongoose.model("Propietario", propietarioSchema);