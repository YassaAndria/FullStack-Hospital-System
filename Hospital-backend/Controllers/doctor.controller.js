const DoctorsDB = require('../models/doctor.model');
const { validateCreateDoctor } = require('../validators/doctor.validation');
// GET /doctors
exports.getDoctors = async (req, res) => {
  const doctors = await DoctorsDB.find().populate("patient", ["_id", "name", "phone"]);
  res.status(200).json(doctors);
};

// GET /doctors/:id
exports.getDoctorById = async (req, res) => {
  const doctor = await DoctorsDB.findById(req.params.id).populate("patient");

  if (doctor) {
    res.status(200).json(doctor);
  } else {
    res.status(404).json({ message: "Doctor not found" });
  }
};

// POST /doctors
exports.createDoctor = async (req, res) => {
  const { error } = validateCreateDoctor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const doctor = new DoctorsDB(req.body);
  const result = await doctor.save();

  res.status(201).json(result);
};

// PUT /doctors/:id
exports.updateDoctor = async (req, res) => {
  const { error } = validateUpdateDoctor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updatedDoctor = await DoctorsDB.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.status(200).json(updatedDoctor);
};

// DELETE /doctors/:id
exports.deleteDoctor = async (req, res) => {
  const doctor = await DoctorsDB.findById(req.params.id);

  if (doctor) {
    await DoctorsDB.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Doctor Deleted" });
  } else {
    res.status(404).json({ message: "Doctor not found" });
  }
};