#!/usr/bin/env node
'use strict';

const pako = require('pako');
const zlib = require('zlib');
const data = require('fs').readFileSync(require('path').join(__dirname, 'bug.bin'));


console.warn(`Deflating ${data.length} bytes`);
console.warn('=======================');

const options = { level: 6 };

let deflatedPakoData = pako.deflate(data, options);
let deflatedZlibData = zlib.deflateSync(data, options);

console.warn(`Deflate by pako: ${deflatedPakoData.length} bytes`);
console.warn(`Deflate by zlib: ${deflatedZlibData.length} bytes`);

for(let i = 0; i < deflatedZlibData.length; i++) {
  if (deflatedPakoData[i] != deflatedZlibData[i]) {
    console.log(`first difference at ${i}`);
    break;
  }
}

console.warn('----------------------');

let inflatedPakoData = pako.inflate(deflatedPakoData);
let inflatedZlibData = zlib.inflateSync(new Buffer(deflatedPakoData));

console.warn(`Inflate by pako(pako): ${inflatedPakoData.length} bytes`);
console.warn(`Inflate by zlib(pako): ${inflatedZlibData.length} bytes`);

console.warn('----------------------');

inflatedPakoData = pako.inflate(deflatedZlibData);
inflatedZlibData = zlib.inflateSync(deflatedZlibData);

console.warn(`Inflate by pako(zlib): ${inflatedPakoData.length} bytes`);
console.warn(`Inflate by zlib(zlib): ${inflatedZlibData.length} bytes`);
