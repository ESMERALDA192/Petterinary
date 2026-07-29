const mongoose = require("mongoose");

let conexionPromesa = null;

const conectarDB = () => {
    if (mongoose.connection.readyState === 1) {
        // Ya hay una conexión activa, la reutilizamos
        return Promise.resolve();
    }

    if (!conexionPromesa) {
        conexionPromesa = mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 20000,
        }).then(() => {
            console.log("Conectado a MongoDB Atlas correctamente");
        }).catch((error) => {
            conexionPromesa = null;
            console.error("Error al conectar con MongoDB:", error.message);
            throw error;
        });
    }

    return conexionPromesa;
};

module.exports = conectarDB;