const express = require('express');
const app = express();
const sharp = require('sharp');
const fs = require('fs');
const { time } = require('console');
const path = require('path');
const formData = require('express-form-data');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(formData.parse());

app.get('/', (req, res) => {
    res.status(200).send("API SERVER");
});

app.post('/api/convert/jpeg', (req, res) => {

    try {
        console.log(req.body);
        console.log(req.headers);
        res.status(422).end();
    } catch (err) {
        console.error(err);
        res.status(422).send("Invalid parameters");
    }
});

app.get('/api/convert/png', (req, res) => {
    //pngファイルを白黒化してpngファイルとして返す
});

app.use((err, req, res, next) => {
    res.status(500).send('Internal Server Error');
    console.log("500 Internal Server Error");
    console.log(err);
})

app.listen(8000, () => {
    console.log("Login API Server Start \n Listening on port: 8000");
});

function getTimeNow() {
    return new Date().getTime();
}