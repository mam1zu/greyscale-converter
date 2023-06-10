import express from 'express';
import convert from './functions/convert';

const app: express.Express = express();

app.use(express.json({limit: '3mb'}));
app.use(express.urlencoded({ limit: '3mb', extended: true}));

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send("API SERVER");
});

app.post('/api/convert/jpeg', (req: express.Request, res: express.Response) => {

    if(req.body.image === undefined) {
        res.status(400).send("Bad Request");
    }

    const buf: Buffer = Buffer.from(req.body.image, 'base64');

    convert("image/jpeg", buf)
    .then((buf: Buffer) => {
        const res_json: Monoimage = { "monoimage": buf.toString('base64')};
        res.status(200).json(res_json);
        accessLog(req.ip, req.url);
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
    });

});

app.post('/api/convert/png', (req: express.Request, res: express.Response) => {
    //pngファイルを白黒化してpngファイルとして返す

    if(req.body.image === undefined) {
        res.status(400).send("Bad Request");
    }

    const buf: Buffer = Buffer.from(req.body.image, 'base64');

    convert("image/png", buf)
    .then((buf: Buffer) => {
        const res_json: Monoimage = { "monoimage": buf.toString('base64')};
        res.status(200).json(res_json);
        accessLog(req.ip, req.url);
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
    });
});

app.use((err: express.Errback, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
})

app.listen(8000, () => {
    console.log("Hairo Backend API Server Start \nListening on port: 8000");
});

const accessLog = (ip: string, url: string): void => {
    const now: Date = new Date();
    const time: string = `${now.getFullYear()}/${now.getMonth()}/${now.getDay()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    console.log(`[${time}]Request to: ${url} from ${ip}`);
}

interface Monoimage {
    monoimage: string;
}