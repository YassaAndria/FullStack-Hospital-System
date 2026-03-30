const AppointmentDB = require('../models/appointment.model');
const {
  validateCreateAppointment,
  validateUpdateAppointment
} = require('../validators/appointment.validation');

// CREATE Appointment
exports.createAppointment = async (req, res) => {
  const { error } = validateCreateAppointment(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const appointment = new AppointmentDB(req.body);
  await appointment.save();

  // 🔥 REAL-TIME NOTIFICATION
  global.emitNewAppointment(appointment);

  res.status(201).json({ appointment });
};

// GET all
exports.getAppointments = async (req, res) => {
  const filter = req.user.isAdmin ? {} : { patient: req.user.id };

  const appointments = await AppointmentDB
    .find(filter)
    .populate('doctor')
    .populate('patient');

  res.json({ appointments });
};

// UPDATE
exports.updateAppointment = async (req, res) => {
  const { error } = validateUpdateAppointment(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const updated = await AppointmentDB.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updated) return res.status(404).json({ message: 'Appointment not found' });

  res.json({ appointment: updated });
};

// DELETE
exports.deleteAppointment = async (req, res) => {
  const deleted = await AppointmentDB.findByIdAndDelete(req.params.id);

  if (!deleted) return res.status(404).json({ message: 'Appointment not found' });

  res.json({ message: 'Appointment deleted' });
};