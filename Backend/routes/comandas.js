const express = require('express');
const router = express.Router();
const Comanda = require('../models/Comanda');

// POST: Crear una nova comanda
router.post('/', async (req, res) => {
    try {
        // Calcula el total de la comanda abans de guardar-la
        const total = req.body.items.reduce((acc, item) => acc + (item.preu * item.quantitat), 0);
        const newComanda = new Comanda({ ...req.body, total, estat: 'Pendent' });
        await newComanda.save();
        res.status(201).json(newComanda);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la comanda', error: error.message });
    }
});

// GET: Obtenir comandes pendents d'aprovació per l'administrador
router.get('/pending', async (req, res) => {
    try {
        const pendingOrders = await Comanda.find({ estat: 'Pendent' });      
        res.status(200).json(pendingOrders);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtenir comandes pendents', error: error.message });
    }
});

// GET: Obtenir comandes per estat
router.get('/byStatus/:status', async (req, res) => {
    try {
        const status = req.params.status;
        const comandas = await Comanda.find({ estat: status });
        res.status(200).json(comandas);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener comandas por estado', error: error.message });
    }
});

// GET: Obtenir totes les comandes de un usuari
router.get('/user/:userId', async (req, res) => {
    try {
        const comandes = await Comanda.find({ usuariId: req.params.userId });
        res.status(200).json(comandes);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtenir les comandes', error: error.message });
    }
});

// GET: Obtenir una comanda específica
router.get('/:comandaId', async (req, res) => {
    try {
        const comanda = await Comanda.findById(req.params.comandaId);
        if (!comanda) {
            return res.status(404).json({ message: 'Comanda no trobada' });
        }
        res.status(200).json(comanda);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtenir la comanda', error: error.message });
    }
});

// PUT: Actualitzar una comanda
router.put('/:comandaId', async (req, res) => {
    try {
        const updatedComanda = await Comanda.findByIdAndUpdate(req.params.comandaId, req.body, { new: true });
        res.status(200).json(updatedComanda);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualitzar la comanda', error: error.message });
    }
});

// DELETE: Eliminar una comanda
router.delete('/:comandaId', async (req, res) => {
    try {
        await Comanda.findByIdAndDelete(req.params.comandaId);
        res.status(200).json({ message: 'Comanda eliminada' });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar la comanda', error: error.message });
    }
});



// PUT: Aprovar o rebutjar una comanda (actualització d'estat)
router.put('/approve/:comandaId', async (req, res) => {
    try {
        const { estat } = req.body; // 'Aprovada' o 'Rebutjada'
        const updatedComanda = await Comanda.findByIdAndUpdate(req.params.comandaId, { estat }, { new: true });
        res.status(200).json(updatedComanda);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualitzar l`estat de la comanda', error: error.message });
    }
});

module.exports = router;