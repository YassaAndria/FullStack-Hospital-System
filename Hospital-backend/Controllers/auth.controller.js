// controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User'); // only model here
const { validateRegisterUser, validateLoginUser } = require('../validators/auth.validation'); // import validator

// POST /auth/register
exports.register = async (req, res) => {
  console.log('Incoming Register Request:', req.body);
  const { error } = validateRegisterUser(req.body);
  if (error) {
    console.error('Validation Error Details:', error.details[0]);
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ message: "User already registered" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    isAdmin: req.body.isAdmin
  });

  const result = await user.save();

  // If user is a patient, automatically create their patient profile
  if (!req.body.isAdmin) {
    const { PatientsDB } = require('../models/PatientsDB');
    const newPatient = new PatientsDB({
      _id: result._id,
      name: req.body.username,
      email: req.body.email,
      age: req.body.age,
      gender: req.body.gender,
      phone: req.body.phone,
      address: req.body.address
    });
    // This could throw if fields are missing, passing error to global error handler
    await newPatient.save();
  } else {
    const { DoctorsDB } = require('../models/DoctorsDB');
    const newDoctor = new DoctorsDB({
      _id: result._id,
      name: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      specialty: req.body.specialty,
      experienceYears: req.body.experienceYears,
      price: req.body.price || 250,
      available: req.body.available !== undefined ? req.body.available : true
    });
    // Extra fields are now optional, and we are populating them from req.body
    await newDoctor.save();
  }

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "10d" }
  );

  const { password, ...other } = result._doc;
  res.status(201).json({ ...other, token });
};

// POST /auth/login
exports.login = async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "Invalid Email" });

  const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordMatch) return res.status(400).json({ message: "Invalid Password" });

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "10d" }
  );

  const { password, ...other } = user._doc;
  res.status(200).json({ ...other, token });
};