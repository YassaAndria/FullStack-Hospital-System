const MedicalRecordDB = require('../models/medicalRecord.model');
const {
  validateCreateMedicalRecord,
  validateUpdateMedicalRecord
} = require('../validators/medicalRecord.validation');

// CREATE Medical Record (Admins/Doctors Only)
exports.createMedicalRecord = async (req, res) => {
  const { error } = validateCreateMedicalRecord(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const record = new MedicalRecordDB(req.body);
  await record.save();

  res.status(201).json({ record });
};

// GET All Records (Admins/Doctors Only)
exports.getAllMedicalRecords = async (req, res) => {
  const records = await MedicalRecordDB
    .find()
    .populate('doctor')
    .populate('patient')
    .sort({ createdAt: -1 });

  res.json({ records });
};

// GET Patient's Records (Allows fetching by Patient directly)
exports.getPatientRecords = async (req, res) => {
  const { patientId } = req.params;
  
  const records = await MedicalRecordDB
    .find({ patient: patientId })
    .populate('doctor', ['name', 'specialty', 'phone'])
    .sort({ createdAt: -1 });

  res.json({ records });
};

// UPDATE Medical Record (Admins/Doctors Only)
exports.updateMedicalRecord = async (req, res) => {
  const { error } = validateUpdateMedicalRecord(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const updated = await MedicalRecordDB.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ).populate('doctor').populate('patient');

  if (!updated) return res.status(404).json({ message: 'Record not found' });

  res.json({ record: updated });
};

// DELETE (Admins/Doctors Only)
exports.deleteMedicalRecord = async (req, res) => {
  const deleted = await MedicalRecordDB.findByIdAndDelete(req.params.id);

  if (!deleted) return res.status(404).json({ message: 'Record not found' });

  res.json({ message: 'Record deleted successfully' });
};
