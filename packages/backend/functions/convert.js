const sharp = require('sharp');

//画像 bufを受け取って 白黒化した画像bufを返す
//TODO: 例外処理を実装する
/*

const convert = (type, buf) => {
    const monoimage = sharp(buf);
    if(type == "image/jpeg") {
        return monoimage.greyscale().jpeg().toBuffer();
    }
    if(type == "image/png") {
        return monoimage.greyscale().png().toBuffer();
    }
}

*/


const convert = (type, buf) => {
    return new Promise((resolve, reject) => {
        const monoimage = sharp(buf);
        if(type == "image/jpeg") {
            resolve(monoimage.greyscale().jpeg().toBuffer());
        }
        else if(type == "image/png") {
            resolve(monoimage.greyscale().png().toBuffer());
        }
        else {
            reject("bad request");
        }
    })
}

module.exports = convert;