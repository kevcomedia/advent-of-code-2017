const input = require('fs')
  .readFileSync('./day22_input', 'utf8')
  .trim();

function toGrid(input) {
  const grid = {};
  const rows = input.split('\n');
  const edge = ~~(rows.length / 2);

  for (let row = -edge; row <= edge; row++) {
    grid[row] = {};
    for (let col = -edge; col <= edge; col++) {
      grid[row][col] = rows[row + edge][col + edge] == '#' ? 2 : 0;
    }
  }

  return grid;
}

function run(input, rounds) {
  const grid = toGrid(input);

  let pos = [0, 0];
  let direction = 0;
  let nInfections = 0;

  for (let round = 0; round < rounds; round++) {
    if (!grid[pos[0]]) {
      grid[pos[0]] = {};
    }

    grid[pos[0]][pos[1]] = grid[pos[0]][pos[1]] || 0;
    direction = (direction + (grid[pos[0]][pos[1]] + 3) % 4) % 4;

    grid[pos[0]][pos[1]] = (grid[pos[0]][pos[1]] + 1) % 4;
    if (grid[pos[0]][pos[1]] == 2) {
      nInfections++;
    }

    switch (direction) {
      case 0:
        pos[0]--;
        break;
      case 1:
        pos[1]++;
        break;
      case 2:
        pos[0]++;
        break;
      case 3:
        pos[1]--;
        break;
    }
  }

  return nInfections;
}

const test = `..#
#..
...`;
console.log(run(input, 10000000));
