const sql = require('mssql');
const dbConfig = require('../dbConfig');

async function findUserByEmail(email) {
  await sql.connect(dbConfig);
  const result = await sql.query`SELECT * FROM Users WHERE email = ${email}`;
  return result.recordset[0];
}

module.exports = { findUserByEmail };