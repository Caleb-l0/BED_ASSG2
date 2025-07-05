const sql = require('mssql');
const dbConfig = require("../dbConfig");

async function CreateUser(){
    await sql.connect(dbConfig);
    


}

module.exports = {CreateUser}