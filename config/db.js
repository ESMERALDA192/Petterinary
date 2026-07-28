const mongoose = require("mongoose");

const conectarDB = async () => {
    try {
        await mongoose.connect("mongodb://petterinary:petterinary2026@ac-tvwp9zc-shard-00-00.b01fapt.mongodb.net:27017,ac-tvwp9zc-shard-00-01.b01fapt.mongodb.net:27017,ac-tvwp9zc-shard-00-02.b01fapt.mongodb.net:27017/petterinary?ssl=true&replicaSet=atlas-3wsvfe-shard-0&authSource=admin&appName=Cluster0");
        console.log("Conectado a MongoDB Atlas correctamente");
    } catch (error) {
        console.error("Error al conectar con MongoDB:", error.message);
        throw error;
    }
};

module.exports = conectarDB;