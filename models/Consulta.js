const mongoose = require("mongoose");

const consultaSchema = new mongoose.Schema({
    animalId: { type: Number, required: true },
    fechaConsulta: { type: Date, required: true },
    motivo: { type: String },
    diagnostico: { type: String },
    tratamiento: { type: String },
    pesoConsulta: { type: Number },
    estadoConsulta: { type: String, default: "pendiente" }
});

module.exports = mongoose.model("Consulta", consultaSchema);