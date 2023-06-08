const express = require('express');
const app = express();
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const convert = require('./functions/convert');

app.use(express.json({limit: '3mb'}));
app.use(express.urlencoded({ limit: '3mb', extended: true}));

app.get('/', (req, res) => {
    res.status(200).send("API SERVER");
});

app.post('/api/convert/jpeg', (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", '*');

    if(req.body.image === undefined) {
        res.status(400).send("Bad Request");
    }

    const buf = Buffer.from(req.body.image, 'base64');

    convert("image/jpeg", buf)
    .then((buf) => {
        const res_json = { "monoimage": buf.toString('base64')};
        res.status(200).json(res_json);
        accessLog(req.ip, req.url);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
    });

});

app.post('/api/convert/png', (req, res) => {
    //pngファイルを白黒化してpngファイルとして返す

    if(req.body.image === undefined) {
        res.status(400).send("Bad Request");
    }

    const buf = Buffer.from(req.body.image, 'base64');

    convert("image/png", buf)
    .then((buf) => {
        const res_json = { "monoimage": buf.toString('base64')};
        res.status(200).json(res_json);
        accessLog(req.ip, req.url);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
    });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
})

app.listen(8000, () => {
    console.log("Hairo Backend API Server Start \nListening on port: 8000");
});

const accessLog = (ip, url) => {
    const now = new Date();
    const time = `${now.getFullYear()}/${now.getMonth()}/${now.getDay()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    console.log(`[${time}]Request to: ${url} from ${ip}`);
}