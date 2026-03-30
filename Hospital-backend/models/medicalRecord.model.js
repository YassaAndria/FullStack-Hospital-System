const mongoose = require('mongoose');

const MedicalRecordSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctors',
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patients',
    required: true
  },
  diagnosis: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  prescription: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const MedicalRecordDB = mongoose.model('MedicalRecords', MedicalRecordSchema);

module.exports = MedicalRecordDB;
