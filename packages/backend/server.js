"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var convert_1 = __importDefault(require("./functions/convert"));
var app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '3mb' }));
app.use(express_1.default.urlencoded({ limit: '3mb', extended: true }));
app.get('/', function (req, res) {
    res.status(200).send("API SERVER");
});
app.post('/api/convert/jpeg', function (req, res) {
    if (req.body.image === undefined) {
        res.status(400).send("Bad Request");
    }
    var buf = Buffer.from(req.body.image, 'base64');
    (0, convert_1.default)("image/jpeg", buf)
        .then(function (buf) {
        var res_json = { "monoimage": buf.toString('base64') };
        res.status(200).json(res_json);
        accessLog(req.ip, req.url);
    })
        .catch(function (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    });
});
app.post('/api/convert/png', function (req, res) {
    //pngファイルを白黒化してpngファイルとして返す
    if (req.body.image === undefined) {
        res.status(400).send("Bad Request");
    }
    var buf = Buffer.from(req.body.image, 'base64');
    (0, convert_1.default)("image/png", buf)
        .then(function (buf) {
        var res_json = { "monoimage": buf.toString('base64') };
        res.status(200).json(res_json);
        accessLog(req.ip, req.url);
    })
        .catch(function (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    });
});
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send('Internal Server Error');
});
app.listen(8000, function () {
    console.log("Hairo Backend API Server Start \nListening on port: 8000");
});
var accessLog = function (ip, url) {
    var now = new Date();
    var time = "".concat(now.getFullYear(), "/").concat(now.getMonth(), "/").concat(now.getDay(), " ").concat(now.getHours(), ":").concat(now.getMinutes(), ":").concat(now.getSeconds());
    console.log("[".concat(time, "]Request to: ").concat(url, " from ").concat(ip));
};
