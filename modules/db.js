const sql = require('mssql');

const authInfo = require('./authinfo')
// Create connection to database
var config = 
  {
    user: authInfo.user, // update me
    password: authInfo.password, // update me
    server: authInfo.server,
    database: authInfo.database,
    options: 
    {
      encrypt: true
    }
  }


var executeSql = async (query) => { 
  var conn = new sql.ConnectionPool(config);
  var req = new sql.Request(conn)

  try {
    await conn.connect()
    const result = await req.query(query)
    
    conn.close();
    
    return result.recordset
  } catch (err) {
    console.log('Error fetching data:', err);
  }
}


module.exports = {
  executeSql
}