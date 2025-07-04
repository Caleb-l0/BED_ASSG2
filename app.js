const express = require('express');
const cors = require('cors');
const path = require('path');

const medsController = require("./Controllers/medsController");

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware//
app.use(express.json()); // 
app.use(express.urlencoded({ extended: true }));


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


//ROUTES//

//Medicine routes//
app.get("/api/meds", medsController.getAllDates);
app.get("/api/meds/:id", ValidateDateID, medsController.getDateById);
app.post("/api/meds", ValidateDate, medsController.createDate);
app.put("/api/meds/:id", ValidateDateID, ValidateDate, medsController.updateDate);
app.delete("/api/meds/:id", ValidateDateID, medsController.deleteDate);


//Start + Shutdown server//
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  await sql.close();
  console.log("Database connections closed");
  process.exit(0);
});

module.exports = app;