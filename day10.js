const assert = require('assert');

const lengths = [1, 2, 3]; //[3, 4, 1, 5];

const x = '225,171,131,2,35,5,0,13,1,246,54,97,255,98,254,110';
const ascii = [...x].map(c => c.charCodeAt()).concat([17, 31, 73, 47, 23]);

const list = Array.from({length: 256}, (_, i) => i);
let skip = 0;
let ptr = 0;

function reverse(length) {
  let start = ptr;
  let end = (ptr + length - 1) % list.length;

  for (let i = 0; i < ~~(length / 2); i++) {
    const s = (start + i) % list.length;
    const e = (list.length + (end - i)) % list.length;

    const temp = list[s];
    list[s] = list[e];
    list[e] = temp;
  }
}

function step() {
  for (let i = 0; i < ascii.length; i++) {
    reverse(ascii[i]);
    ptr += ascii[i] + skip;
    skip++;
  }
}

function rounds() {
  for (let i = 0; i < 64; i++) {
    step();
  }
}

function denseHash() {
  let hash = [];
  for (let i = 0; i < 256; i += 16) {
    hash.push(list.slice(i, i + 16).reduce((a, b) => a ^ b));
  }
  return hash;
}

function toHex(hash) {
  return hash.map(n => n.toString(16).padStart(2, '0')).join('');
}

rounds();
const hash = denseHash();
console.log(toHex(hash));
