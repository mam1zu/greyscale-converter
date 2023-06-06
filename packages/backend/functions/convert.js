const sharp = require('sharp');

const convert = (type, buf) => {
    const monoimage = sharp(buf);
    if(type == "image/jpeg") {
        return monoimage.greyscale().jpeg();
    }
    if(type == "image/png") {
        return monoimage.greyscale().png();
    }
}

module.exports = convert;