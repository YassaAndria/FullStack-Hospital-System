const mongoose = require('mongoose');

// Doctors schema
const DoctorsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    trim: true,
  },

  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patients'
  },

  specialty: {
    type: String,
    minlength: 3,
    maxlength: 100,
    trim: true,
  },

  experienceYears: {
    type: Number,
    min: 1,
    max: 50
  },

  phone: {
    type: String,
    minlength: 10,
    maxlength: 11
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },

  price: {
    type: Number,
    min: 0
  },

  available: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

const DoctorsDB = mongoose.model('Doctors', DoctorsSchema);

module.exports = {DoctorsDB};