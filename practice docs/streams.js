const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', {encoding: 'utf8'})
const writeStream = fs.createWriteStream('./docs/blog4.txt');


// readStream.on('data', (chunk) =>{
//     console.log('-----new chunk-----');
//     console.log(chunk);
//     writeStream.write('\nNew Chunk\n');
//     writeStream.write(chunk);
// })


// --piping--- another way

readStream.pipe(writeStream);