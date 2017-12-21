const input = require('fs')
  .readFileSync('./day21_input', 'utf8')
  .trim();

const getSize = part => (Math.sqrt(4 * part.length + 5) - 1) / 2;
const isEven = part => getSize(part) % 2 == 0;
const flip = part =>
  part
    .split('/')
    .reverse()
    .join('/');
const rotate = part => {
  const rows = part.split('/');
  let rotated;
  if (isEven(part)) {
    rotated = [rows[1][0], rows[0][0], '/', rows[1][1], rows[0][1]];
  } else {
    rotated = [
      rows[2][0],
      rows[1][0],
      rows[0][0],
      '/',
      rows[2][1],
      rows[1][1],
      rows[0][1],
      '/',
      rows[2][2],
      rows[1][2],
      rows[0][2],
    ];
  }
  return rotated.join('');
};
const getParts = whole => {
  const size = getSize(whole);
  const rows = whole.split('/');
  const parts = [];
  const partSize = isEven(whole) ? 2 : 3;
  for (let row = 0; row < rows.length; row += partSize) {
    for (let col = 0; col < rows.length; col += partSize) {
      let part = [];
      for (let i = 0; i < partSize; i++) {
        part.push(rows[row + i].slice(col, col + partSize));
      }
      parts.push(part.join('/'));
    }
  }

  return parts;
};

function parse(input) {
  const rules = {};
  const lines = input.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const tokens = lines[i].split(' => ');
    let p = tokens[0];
    const nRotations = isEven(p) ? 4 : 8;
    for (let j = 0; j < nRotations; j++) {
      p = rotate(p);
      rules[p] = tokens[1];
      rules[flip(p)] = tokens[1];
    }
  }

  return rules;
}

function merge(parts) {
  const size = Math.sqrt(parts.length);
  const merged = [];

  for (let i = 0; i < size; i++) {
    const partsRow = parts.slice(i * size, (i + 1) * size);
    const subgridSize = getSize(partsRow[0]);
    for (let j = 0; j < subgridSize; j++) {
      let row = '';
      for (let k = 0; k < size; k++) {
        row += partsRow[k].split('/')[j];
      }
      merged.push(row);
    }
  }

  return merged.join('/');
}

function run(input, rounds) {
  const seed = '.#./..#/###';
  const rules = parse(input);

  let curr = seed;
  for (let i = 0; i < rounds; i++) {
    const parts = getParts(curr);
    const transformed = parts.map(p => rules[p]);
    const merged = merge(transformed);
    curr = merged;
  }
  return curr.replace(/[^#]/g, '').length;
}

console.log(run(input, 5));
console.log(run(input, 18));
