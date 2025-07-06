const express = require('express');
const cors = require('cors');
const path = require('path');
const sql = require('mssql');
require('dotenv').config();

//Import Validation//
const validateSignup = require('./Middlewares/signupValidation');
const validateLogin = require('./Middlewares/loginValidation');


//Import Controller//
const { loginUser } = require('./Controllers/loginController');
const { registerUser } = require('./Controllers/signupController');
const medsController = require("./Controllers/medsController");
const { validateDate, validateDateID } = require("./Middlewares/medsValidation");


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
//Signup/Login//
app.post('/login', validateLogin, loginUser);
app.post('/signup', validateSignup, registerUser);

//Medicine//
app.get("/api/meds", medsController.getAllDates);
app.get("/api/meds/:id", validateDateID, medsController.getDateById);
app.post("/api/meds", validateDate, medsController.createDate);
app.put("/api/meds/:id", validateDateID, validateDate, medsController.updateDate);
app.delete("/api/meds/:id", validateDateID, medsController.deleteDate);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await sql.close();
  process.exit(0);
});

module.exports = app;
