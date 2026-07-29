const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    usuario: { type: String, required: true, unique: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model("Usuario", usuarioSchema);