const key = 'stpzcrnm';

function reverse(list, ptr, length) {
  let start = ptr;
  let end = (ptr + length - 1) % list.length;

  for (let i = 0; i < ~~(length / 2); i++) {
    const s = (start + i) % list.length;
    const e = (list.length + (end - i)) % list.length;

    [list[s], list[e]] = [list[e], list[s]];
  }
}

function step(lengths, list, ptr, initialSkip) {
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

function knotHash(key) {
  const lengths = [...key]
    .map(c => c.charCodeAt())
    .concat([17, 31, 73, 47, 23]);
  const list = Array.from({length: 256}, (_, i) => i);

  let ptr = 0;
  let skip = 0;
  for (let i = 0; i < 64; i++) {
    ptr = step(lengths, list, ptr, skip);
    skip += lengths.length;
  }

  return denseHash(list);
}

function createGrid(key) {
  let grid = [];

  for (let i = 0; i < 128; i++) {
    const inp = `${key}-${i}`;
    const bits = [...knotHash(inp)]
      .map(c => Number.parseInt(c, 16))
      .map(n => n.toString(2).padStart(4, '0'))
      .reduce((a, b) => [...a, ...b], []);

    grid.push(bits);
  }

  return grid;
}

function countUsed(grid) {
  return grid
    .map(row => row.filter(c => c == '1').length)
    .reduce((a, b) => a + b);
}

function countRegions(grid) {
  // cheap, but quick way of deep-copying a matrix :P
  const gridCopy = JSON.parse(JSON.stringify(grid));
  let regions = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid.length; col++) {
      if (gridCopy[row][col] === '0') continue;

      const queue = [{row, col}];
      while (queue.length > 0) {
        const p = queue.shift();

        const neighbors = [
          {row: p.row - 1, col: p.col},
          {row: p.row, col: p.col - 1},
          {row: p.row, col: p.col + 1},
          {row: p.row + 1, col: p.col},
        ];

        neighbors
          .filter(p => p.row >= 0 && p.row < 128 && (p.col >= 0 && p.col < 128))
          .filter(p => gridCopy[p.row][p.col] == '1')
          .forEach(p => {
            gridCopy[p.row][p.col] = '0';
            queue.push(p);
          });
      }

      regions++;
    }
  }

  return regions;
}

const grid = createGrid(key);

console.log(countUsed(grid));
console.log(countRegions(grid));
