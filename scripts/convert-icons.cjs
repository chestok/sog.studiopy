const sharp = require('sharp');
const path = require('path');

const items = [
  { in: path.join(__dirname, '..', 'src', 'logoSOG.png'), out: path.join(__dirname, '..', 'src', 'logoSOG.webp') },
  { in: path.join(__dirname, '..', 'public', 'instagram-icon.png'), out: path.join(__dirname, '..', 'public', 'instagram-icon.webp') }
];

Promise.all(items.map(it => {
  return sharp(it.in)
    .webp({ quality: 80 })
    .toFile(it.out)
    .then(info => {
      console.log('converted', it.in, '->', it.out, info.size);
    })
    .catch(err => {
      console.error('error converting', it.in, err.message);
    });
}))
.then(() => console.log('done'))
.catch(err => console.error(err));
