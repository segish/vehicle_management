const router = require('express').Router();
const Vehicle = require('../models/Vehicles');

// Get all vehicles
router.get('/', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Add new vehicle
router.post('/', async (req, res) => {
    try {
        const newVehicle = new Vehicle(req.body);
        const savedVehicle = await newVehicle.save();
        res.json(savedVehicle);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Update vehicle
router.put('/:id', async (req, res) => {
    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedVehicle);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Delete vehicle
router.delete('/:id', async (req, res) => {
    try {
        await Vehicle.findByIdAndDelete(req.params.id);
        res.json('Vehicle deleted');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;