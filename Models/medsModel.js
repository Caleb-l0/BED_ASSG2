const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

//GET//
async function GetAllDates(){
    let connection;
    try{
        connection = await sql.connect(dbConfig)
        const query =  "SELECT id, medicine, datetime FROM Medicine";
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

//CREATE//
async function CreateDate(){
    let connection;
    try{
        connection = await sql.connect(dbConfig)
        const query = "INSERT INTO Medicine";
        const request = connection.request();
        request.input("medicine", bookData.medicine);
        request.input("datetime", bookData.datetime);
        const result = await request.query(query);
    }
    catch{

    }

}

module.exports = {
    GetAllDates,
    CreateDate,
}