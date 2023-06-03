const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sharp = require('sharp');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send("API SERVER");
});

app.get('/api/convert/jpeg', (req, res) => {
    //jpegファイルを白黒化してjpegファイルとして返す
});

app.get('/api/convert/png', (req, res) => {
    //pngファイルを白黒化してpngファイルとして返す
});