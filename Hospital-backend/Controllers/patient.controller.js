const { PatientsDB, validateCreatePatient, validateUpdatePatient } = require('../models/PatientsDB');

// GET /patients
exports.getPatients = async (req, res) => {
  const patients = await PatientsDB.find().sort({ name: 1 });
  res.status(200).json(patients);
};

// GET /patients/:id
exports.getPatientById = async (req, res) => {
  const patient = await PatientsDB.findById(req.params.id);

  if (patient) {
    res.status(200).json(patient);
  } else {
    res.status(404).json({ message: "Patient not found" });
  }
};

// POST /patients
exports.createPatient = async (req, res) => {
  const { error } = validateCreatePatient(req.body);
  if (error) {
    return res.status(400).json({ message: error.details.message });
  }

  const patient = new PatientsDB(req.body);
  const result = await patient.save();

  res.status(201).json(result);
};

// PUT /patients/:id
exports.updatePatient = async (req, res) => {
  const { error } = validateUpdatePatient(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updatedPatient = await PatientsDB.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.status(200).json(updatedPatient);
};

// DELETE /patients/:id
exports.deletePatient = async (req, res) => {
  const patient = await PatientsDB.findById(req.params.id);

  if (patient) {
    await PatientsDB.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Patient Deleted" });
  } else {
    res.status(404).json({ message: "Patient not found" });
  }
};