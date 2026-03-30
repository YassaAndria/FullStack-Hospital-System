const mongoose = require('mongoose');

const PatientsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    gender: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        trim: true,
    },
    phone: {
        type: String, // changed to String for consistency[joi]
        required: true,
        minlength: 10,
        maxlength: 11
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    address: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        trim: true,
    }
}, { timestamps: true });

const PatientsDB = mongoose.model('Patients', PatientsSchema);

module.exports = {PatientsDB};