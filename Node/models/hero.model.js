'use strict';
const mongoose = require('mongoose');

const Hero = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    Gender: { type: String },
    "Eye color": { type: String },
    Race: { type: String },
    Height: { type: Number },
    Publisher: { type: String },
    "Skin color": { type: String },
    Alignment: { type: String },
    Weight: { type: Number },
});

module.exports = mongoose.model('heroes', Hero);