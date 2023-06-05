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
        const fpath = path.join(__dirname, "temp", getTimeNow() + ".jpeg");
        console.log(fpath);
        console.log(req.body);
        console.log(req.headers);
        const fileReader = new FileReader();
        let arrayBuffer = undefined;
        fileReader.readAsArrayBuffer(req);
        fileReader.onload = async () => {
            arrayBuffer = fileReader.result;
        }
        const img_buf = img_blob.arrayBuffer()
        //受け取ったjpegファイルを白黒化して一時的に保存, 名前はなんかいい感じのフォーマットを考える
        fs.writeFileSync(fpath, req.body.image);
        res.status(200).sendFile(fpath);
        //送信し終わったのでファイルは消す
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