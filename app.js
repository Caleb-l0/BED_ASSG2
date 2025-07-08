const express = require('express');
const cors = require('cors');
const path = require('path');
const sql = require('mssql');
const dbConfig = require("./dbConfig");
require('dotenv').config();

// Import controllers
const { loginUser } = require('./Controllers/loginController');
const { signupUser } = require('./Controllers/signupController');
const medsController = require('./Controllers/medsController');
const appointmentsController  = require('./Controllers/appointmentsController');

// Import validation middleware
const { validateLogin } = require('./Middlewares/loginValidation');
const { validateSignup } = require('./Middlewares/signupValidation');
const { validateDate, validateDateID } = require('./Middlewares/medsValidation');


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
app.post('/signup', validateSignup, signupUser);

//Medicine//
app.get("/api/meds", medsController.getAllDates);
app.get("/api/meds/:id", validateDateID, medsController.getDateById);
app.post("/api/meds", validateDate, medsController.createDate);
app.put("/api/meds/:id", validateDateID, validateDate, medsController.updateDate);
app.delete("/api/meds/:id", validateDateID, medsController.deleteDate);

//Appointments//
app.get("/api/appointments", appointmentsController.getAppointmentHistory);


// Start server
app.listen(PORT, async () => {
      try {
        // Connect to the database
        await sql.connect(dbConfig);
        console.log("Database connection established successfully");
      } catch (err) {
        console.error("Database connection error:", err);
        // Terminate the application with an error code (optional)
        process.exit(1); // Exit with code 1 indicating an error
      }
    
      console.log(`Server listening on port ${PORT}`);
    });
    
    // Close the connection pool on SIGINT signal
    process.on("SIGINT", async () => {
      console.log("Server is gracefully shutting down");
      // Perform cleanup tasks (e.g., close database connections)
      await sql.close();
      console.log("Database connection closed");
      process.exit(0); // Exit with code 0 indicating successful shutdown
    });

module.exports = app;
