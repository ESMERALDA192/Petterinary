const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
    propietarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Propietario", required: true },    nombreAnimal: { type: String, required: true },
    especieAnimal: { type: String, required: true },
    razaAnimal: { type: String, required: true },
    sexoAnimal: { type: String, required: true },
    pesoAnimal: { type: Number, required: true },
    fechaIngresoAnimal: { type: Date },
    estadoAnimal: { type: String, default: "activo" }
});

module.exports = mongoose.model("Animal", animalSchema);
