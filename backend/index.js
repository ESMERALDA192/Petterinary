require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta raiz para comprobar que la API funciona
app.get("/", (req, res) => {
    res.send("API de Petterinary funcionando");
});

// Rutas de la API (las hace Paul)
app.use("/api/propietarios", require("./routes/propietarios"));
app.use("/api/animales", require("./routes/animales"));
app.use("/api/consultas", require("./routes/consultas"));

// Conectar a la base de datos siempre (tanto en local como en Vercel)
conectarDB().catch((error) => {
    console.error("No se pudo conectar a la base de datos:", error.message);
});

// Solo abre un puerto si corres el archivo directamente (no cuando Vercel lo importa)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
}

module.exports = app;