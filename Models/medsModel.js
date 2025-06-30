const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

//GET//
async function GetAllDates(){
    let connection;
    try{
        connection = await sql.connect(dbConfig)
        const query "SELECT id, medicine, datetime FROM Medicine";

    }
}

//CREATE//
async function CreateDate(){
    let connection;


}