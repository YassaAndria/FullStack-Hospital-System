# MERN Medical Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing doctors, patients, appointments, and medical records with secure authentication and a modern user interface.

---

## Features

### Authentication & Authorization

* User registration and login
* Password hashing using bcrypt
* JWT-based authentication
* Protected routes
* Role-based access control

---

### Doctors Management

* Create doctor
* View all doctors
* Update doctor details
* Delete doctor

---

### Patients Management

* Create patient
* View all patients
* Update patient data
* Delete patient

---

### Appointments System

* Schedule appointments
* Link doctors with patients
* View all appointments
* Manage appointment data

---

### Medical Records

* Add medical records for patients
* View patient history
* Manage medical data

---

### Frontend (React + Redux)

* State management using Redux Toolkit
* Centralized state (auth, doctors, patients)
* Protected routes
* Forms with validation
* API integration using Axios
* Responsive UI using Tailwind CSS

---

## Tech Stack

### MERN Stack

* MongoDB
* Express.js
* React.js
* Node.js

### Frontend

* Redux Toolkit
* React Router
* Axios
* Tailwind CSS

### Backend

* Mongoose
* JWT
* bcrypt
* Joi Validation

---

## Project Structure

```bash
project/
│
├── server/        # Backend (Node.js + Express)
├── client/        # Frontend (React + Redux)
└── README.md
```

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Backend Setup

```bash
cd server
npm install
npm run dev
```

### 3. Frontend Setup

```bash
cd client
npm install
npm start
```

---

## Environment Variables

Create a `.env` file inside the server folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## Future Improvements

* Pagination and filtering
* File uploads
* Notifications system
* Deployment

---

## Author

Developed by [Yassa Andria]

---

## License

This project is open-source and available under the MIT License.
