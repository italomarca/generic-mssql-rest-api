var express = require('express')
var app = express()
//var https = require('https');
var http = require('http');
const sql = require('mssql')

const dbConfig = {
  user: '',   //Type user here
  password: '', //Type password here
  server: '',  //Type server here
  database: '', //Type database here
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 5000
  }
}

async function executeSql(query) {
  const q = [query]
  try {
      const pool = await sql.connect(dbConfig)
      const result = await sql.query(q)
      sql.close()
      return result
  } catch (err) {
      sql.close()
      return err
  }
}


app.get('/:table', function (req, res) {
  executeSql('select * from ' + req.params.table)
    .then( x => {
      res.send(JSON.stringify(x))
    })
    .catch( err => {
      res.send(JSON.stringify(err))
      console.log(err);
    })
})

//Future work
//app.put('/:table', function (req, res) {
//
//});

http.createServer(app).listen(9099);