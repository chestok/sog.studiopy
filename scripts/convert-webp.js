const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const input = path.join(__dirname, '..', 'src', 'IMG_8509 (3).png');
const output = path.join(__dirname, '..', 'src', 'IMG_8509.webp');

sharp(input)
  .metadata()
  .then(meta => {
    console.log('meta', meta.width, meta.height, meta.format);
    return sharp(input)
      .webp({ quality: 75 })
      .toFile(output);
  })
  .then(info => {
    console.log('converted', info);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
