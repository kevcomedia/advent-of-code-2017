const assert = require('assert');
const input = 368078;

assert.equal(manhattanDistance(1), 0);
assert.equal(manhattanDistance(12), 3);
assert.equal(manhattanDistance(13), 4);
assert.equal(manhattanDistance(14), 3);
assert.equal(manhattanDistance(23), 2);
assert.equal(manhattanDistance(1024), 31);

function manhattanDistance(n) {
  if (n == 1) return 0;

  const nextSquare = Math.ceil(Math.sqrt(n))**2;
  const nextOddSquare = nextSquare % 2 ? nextSquare : (Math.sqrt(nextSquare) + 1)**2;
  const prevOddSquare = (Math.sqrt(nextOddSquare) - 2)**2;
  const range = (Math.sqrt(nextOddSquare) - 1);
  let nn = (n - prevOddSquare) % range
  if (nn < range / 2 ) {
    nn = range - nn;
  }
  return nn;
}

console.log(manhattanDistance(input));

function spiralLazySum(radius) {
  function isOutOfBounds({row, col}, size) {
    return isRowOutOfBounds(row, size) || isColOutOfBounds(col, size);
  }

  function isRowOutOfBounds(row, size) {
    return row < 0 || size <= row;
  }

  function isColOutOfBounds(col, size) {
    return col < 0 || size <= col;
  }

  const grid = [];
  for (let i = 0; i < radius * 2 + 1; i++) {
    grid.push(Array(radius * 2 + 1).fill(0));
  }
  grid[radius][radius] = 1;

  const directions = [
    {name: 'right', row: 0, col: 1},
    {name: 'up', row: -1, col: 0},
    {name: 'left', row: 0, col: -1},
    {name: 'down', row: 1, col: 0}
  ];
  let steps = 0;
  let di = 0;
  let pointer = {row: radius, col: radius};

  for (let i = 0; i < (radius * 2 + 1)**2 - 1; i++) {
    if (i % 2 == 0) steps++;
    for (let j = 0; j < steps; j++) {
      pointer.row += directions[di].row;
      pointer.col += directions[di].col;
      const {row, col} = pointer;

      if (isOutOfBounds(pointer, radius * 2 + 1)) continue;

      const neighborCells = [
        {row, col: col + 1},
        {row: row - 1, col: col + 1},
        {row: row - 1, col},
        {row: row - 1, col: col - 1},
        {row, col: col - 1},
        {row: row + 1, col: col - 1},
        {row: row + 1, col},
        {row: row + 1, col: col + 1},
      ].filter((o) => !isOutOfBounds(o, radius * 2 + 1));

      const nums = neighborCells.map((n) => grid[n.row][n.col]);
      grid[row][col] = nums.reduce((a, b) => a + b, 0);
    }

    di = (di + 1) % 4;
  }

  return grid;
}

function flatten(grid) {
  return grid.reduce((a, b) => a.concat(b), []);
}

function firstLarger(grid, num) {
  const flattened = flatten(grid);
  flattened.sort((a, b) => b - a);
  if (flattened[0] < num) return null;

  const larger = flattened.filter((n) => n >= num);
  return larger[larger.length - 1];
}

console.log(firstLarger(spiralLazySum(4), input));
