const express = require('express');
const app = express();

app.listen(8080);

app.get('/', (req, res) => {
  res.sendFile('/home/runner/Testing/webpage.html');
});

app.post('/', (req, res) => {
  res.send('<p>No</p>');
});