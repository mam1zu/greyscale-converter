const express = require('express');
const app = express();
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

app.use(express.json({limit: '3mb'}));
app.use(express.urlencoded({ limit: '3mb', extended: true}));

app.get('/', (req, res) => {
    res.status(200).send("API SERVER");
});

app.post('/api/convert/jpeg', (req, res) => {

    try {
        const timeNow = new Date().getTime();
        const fpath = path.join(__dirname, "temp", timeNow+".jpeg");
        if(req.body.image !== undefined) {
            const buf = Buffer.from(req.body.image, 'base64');
            fs.writeFileSync(fpath, buf, (err) => {
                if(err) {
                    throw err;
                }
                else {
                    console.log("A file has been created");
                }
            });

            //TODO: 得られたファイルに対して画像処理を行いbase64に変換した後送信
            const res_json = {
                "monoimage": req.body.image
            }
            res.status(200).json(res_json);
        } else {
            console.log("req.body.img is empty");
            res.status(400).send('req.body.img is empty');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
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