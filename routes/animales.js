const express = require("express");
const router = express.Router();
const Animal = require("../models/Animal");

router.get("/", async (req, res) => {
    try {
        const animales = await Animal.find();
        res.json(animales);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener animales", error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) return res.status(404).json({ mensaje: "No encontrado" });
        res.json(animal);
    } catch (error) {
        res.status(500).json({ mensaje: "Error", error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const nuevo = new Animal(req.body);
        const guardado = await nuevo.save();
        res.status(201).json(guardado);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al registrar", error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const actualizado = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!actualizado) return res.status(404).json({ mensaje: "No encontrado" });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al actualizar", error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const eliminado = await Animal.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ mensaje: "No encontrado" });
        res.json({ mensaje: "Eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar", error: error.message });
    }
});

module.exports = router;