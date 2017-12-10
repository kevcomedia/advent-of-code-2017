const x = '225,171,131,2,35,5,0,13,1,246,54,97,255,98,254,110';
const lengths = [...x].map(c => c.charCodeAt()).concat([17, 31, 73, 47, 23]);

function reverse(list, ptr, length) {
  let start = ptr;
  let end = (ptr + length - 1) % list.length;

  for (let i = 0; i < ~~(length / 2); i++) {
    const s = (start + i) % list.length;
    const e = (list.length + (end - i)) % list.length;

    [list[s], list[e]] = [list[e], list[s]];
  }
}

function step(list, ptr, initialSkip) {
  for (let i = 0; i < lengths.length; i++) {
    reverse(list, ptr, lengths[i]);
    ptr += lengths[i] + i + initialSkip;
  }
  return ptr;
}

function denseHash(list) {
  let hash = '';
  for (let i = 0; i < 256; i += 16) {
    const xored = list.slice(i, i + 16).reduce((a, b) => a ^ b);
    const hex = xored.toString(16).padStart(2, '0');
    hash += hex;
  }
  return hash;
}

function knotHash(lengths) {
  const list = Array.from({length: 256}, (_, i) => i);

  let ptr = 0;
  let skip = 0;
  for (let i = 0; i < 64; i++) {
    ptr = step(list, ptr, skip);
    skip += lengths.length;
  }

  return denseHash(list);
}

console.log(knotHash(lengths));
