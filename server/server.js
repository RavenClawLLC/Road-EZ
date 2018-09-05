const path = require('path');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/bundle.js', (req, res) => {
  console.log('bundle');
  res.sendFile(path.join(__dirname, '../dist/bundle.js'));
});

app.listen(3000, () => {
  console.log('LISTENING ON 30000');
});
