const sql = require('mssql');
const dbConfig = require("../dbConfig");

//GET//
async function getAppointmentsHistory(){
    let connection;
    try{
        connection = await sql.connect(dbConfig)
        const query =  "SELECT AppointmentID, Date, Time, Doctor, Location FROM Appointments WHERE UserId = @userId ORDER BY Date DESC, Time DESC";
        const result = await connection.request().query(query);
        return result.recordset;

    }
    catch(error){
        console.error("Database error:", error);
    throw error;
    } 
    finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }

    
}

module.exports = {
    getAppointmentsHistory

}