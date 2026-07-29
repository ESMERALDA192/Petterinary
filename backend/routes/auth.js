const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");

// POST - registrar nuevo usuario
router.post("/registro", async (req, res) => {
    try {
        const existente = await Usuario.findOne({ usuario: req.body.usuario });
        if (existente) {
            return res.status(400).json({ mensaje: "Ese nombre de usuario ya está registrado" });
        }

        const nuevo = new Usuario(req.body);
        const guardado = await nuevo.save();
        res.status(201).json({ mensaje: "Usuario registrado correctamente", usuario: guardado });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al registrar usuario", error: error.message });
    }
});

// POST - iniciar sesión
router.post("/login", async (req, res) => {
    try {
        const { usuario, password } = req.body;

        const encontrado = await Usuario.findOne({ usuario: usuario });
        if (!encontrado) {
            return res.status(401).json({ mensaje: "Usuario no encontrado" });
        }

        if (encontrado.password !== password) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        res.json({
            mensaje: "Inicio de sesión exitoso",
            usuario: {
                nombre: encontrado.nombre,
                apellidos: encontrado.apellidos,
                usuario: encontrado.usuario,
                correo: encontrado.correo
            }
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al iniciar sesión", error: error.message });
    }
});

module.exports = router;