const express = require("express");
const router = express.Router();
const Propietario = require("../models/Propietario");

// GET - listar todos
router.get("/", async (req, res) => {
    try {
        const propietarios = await Propietario.find();
        res.json(propietarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener propietarios", error: error.message });
    }
});

// GET - uno por id
router.get("/:id", async (req, res) => {
    try {
        const propietario = await Propietario.findById(req.params.id);
        if (!propietario) return res.status(404).json({ mensaje: "No encontrado" });
        res.json(propietario);
    } catch (error) {
        res.status(500).json({ mensaje: "Error", error: error.message });
    }
});

// POST - crear
router.post("/", async (req, res) => {
    try {
        const nuevo = new Propietario(req.body);
        const guardado = await nuevo.save();
        res.status(201).json(guardado);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al registrar", error: error.message });
    }
});

// PUT - actualizar
router.put("/:id", async (req, res) => {
    try {
        const actualizado = await Propietario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!actualizado) return res.status(404).json({ mensaje: "No encontrado" });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al actualizar", error: error.message });
    }
});

// DELETE - eliminar
router.delete("/:id", async (req, res) => {
    try {
        const eliminado = await Propietario.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ mensaje: "No encontrado" });
        res.json({ mensaje: "Eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar", error: error.message });
    }
});

module.exports = router;