require("dotenv").config();
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Esperar la conexión a la base de datos antes de procesar cada petición
app.use(async (req, res, next) => {
    try {
        await conectarDB();
        next();
    } catch (error) {
        next(error);
    }
});

// Ruta raiz para comprobar que la API funciona
app.get("/", (req, res) => {
    res.send("API de Petterinary funcionando");
});

// Rutas de la API (las hace Paul)
app.use("/api/propietarios", require("./routes/propietarios"));
app.use("/api/animales", require("./routes/animales"));
app.use("/api/consultas", require("./routes/consultas"));
app.use("/api/auth", require("./routes/auth"));

// Solo abre un puerto si corres el archivo directamente (no cuando Vercel lo importa)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
}

module.exports = app;