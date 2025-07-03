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
async function getDateById(id) {
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const query = "SELECT * FROM Medicine WHERE id = @id";
    const request = connection.request();
    request.input("id", id);
    const result = await request.query(query);

    if (result.recordset.length === 0) {
      return null; 
    }

    return result.recordset[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
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

async function updateDate(id, { medicine, datetime }) {
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const query =
      "UPDATE Medicine SET medicine = @medicine, datetime = @datetime WHERE id = @id";
    const request = connection.request();
    request.input("id", sql.Int, id);
    request.input("medicine", sql.VarChar, medicine);
    request.input("datetime", sql.DateTime, datetime);
    const result = await request.query(query);

    if (result.rowsAffected[0] === 0) {
      return null; 
    }

    return await getDateById(id);
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}
async function deleteDate(id) {
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const query = "DELETE FROM Medicine WHERE id = @id";
    const request = connection.request();
    request.input("id", id);
    const result = await request.query(query);

    if (result.rowsAffected[0] === 0) {
      return null; 
    }

    return true; 
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
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
    GetAllDates,
    getDateById,
    CreateDate,
    updateDate,
    deleteDate,

}