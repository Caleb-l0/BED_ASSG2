const sql = require("mssql");
const dbConfig = require("../dbConfig");

async function createUser(name, email, hashedPassword) {
  await sql.connect(dbConfig);
  const result = await sql.query`
    INSERT INTO Users (name, email, password) 
    VALUES (${name}, ${email}, ${hashedPassword})
  `
  return result;
}

module.exports = { createUser };