const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send("API SERVER");
});

app.get('/api/imageconvert', (req, res) => {
    
});