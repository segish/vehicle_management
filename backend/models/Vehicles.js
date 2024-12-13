const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    Make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Vehicle', vehicleSchema);