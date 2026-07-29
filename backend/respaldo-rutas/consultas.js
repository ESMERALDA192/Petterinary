const express = require("express");
const router = express.Router();
const Consulta = require("../models/Consulta");

router.get("/", async (req, res) => {
    try {
        const consultas = await Consulta.find();
        res.json(consultas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener consultas", error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const consulta = await Consulta.findById(req.params.id);
        if (!consulta) return res.status(404).json({ mensaje: "No encontrada" });
        res.json(consulta);
    } catch (error) {
        res.status(500).json({ mensaje: "Error", error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const nueva = new Consulta(req.body);
        const guardada = await nueva.save();
        res.status(201).json(guardada);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al registrar", error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const actualizada = await Consulta.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!actualizada) return res.status(404).json({ mensaje: "No encontrada" });
        res.json(actualizada);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al actualizar", error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const eliminada = await Consulta.findByIdAndDelete(req.params.id);
        if (!eliminada) return res.status(404).json({ mensaje: "No encontrada" });
        res.json({ mensaje: "Eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar", error: error.message });
    }
});

module.exports = router;