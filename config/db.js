const mongoose = require("mongoose");

const conectarDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://petterinary:petterinary2026@cluster0.b01fapt.mongodb.net/petterinary?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Conectado a MongoDB Atlas correctamente");
    } catch (error) {
        console.error("Error al conectar con MongoDB:", error.message);
        throw error;
    }
};

module.exports = conectarDB;