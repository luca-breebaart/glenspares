const express = require('express');
const CarSchema = require('../models/cars');
const router = express.Router();

//Create car
router.post('/api/car', async (req, res) => {
    const car = new CarSchema({ ...req.body })
    await car.save()
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
})

// Read all cars
router.get('/api/cars', async (req, res) => {
    try {
        const cars = await CarSchema.find();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read a single car
router.get('/api/car/:id', async (req, res) => {
    try {
        const car = await CarSchema.findById(req.params.id);
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a car
router.put('/api/car/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await CarSchema.findByIdAndUpdate(id, req.body);
        res.json({ message: 'Car updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a car
router.delete('/api/car/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await CarSchema.findByIdAndDelete(id);
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
