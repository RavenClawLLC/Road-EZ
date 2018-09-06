const path = require('path');
const express = require('express');
const dbController = require('./dbController');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/bundle.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/bundle.js'));
});

app.put('/newDog', dbController.createDog, dbController.getYourDogs);

app.listen(5000, () => {
  console.log('LISTENING ON 30000');
});
