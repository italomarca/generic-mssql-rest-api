const db = require('./modules/db');
const express = require('express');

var app = express();

app.get('/', (req, res) => {
  res.send('Server ok!');
})

app.get('/:table', (req, res) => {

  const table = req.params.table;
  
  if (table === 'favicon.ico') {
    return;
  }
   
  db.executeSql(`select * from ${table}`)
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})

app.put('/:table', (req, res) => {
  res.send()
});

app.listen('3000', () => {
  console.log('Listening on port 3000');
})