const input = require('fs').readFileSync('./day19_input', 'utf8');

function traverse(input) {
  const letters = [];
  const inputRows = input.split('\n');
  const width = input.indexOf('\n');
  const height = inputRows.length;

  let pos = {row: 0, col: 0};
  let prev = {row: -1, col: -1};
  pos.col = inputRows[0].indexOf('|');

  let isVertical = true;
  let count = 0;

  while (true) {
    const curr = inputRows[pos.row][pos.col];
    if (/[A-Z]/.test(curr)) {
      letters.push(curr);
    }

    if (curr == '+') {
      isVertical = !isVertical;
    }

    count++;

    const neighbors = [
      {row: pos.row - 1, col: pos.col},
      {row: pos.row, col: pos.col - 1},
      {row: pos.row, col: pos.col + 1},
      {row: pos.row + 1, col: pos.col},
    ]
      .filter(
        ({row, col}) => 0 <= row && row < height && 0 <= col && col < width
      )
      .filter(({row, col}) => inputRows[row][col] != ' ')
      .filter(({row, col}) => row != prev.row || col != prev.col);

    const neighbor = neighbors.find(
      ({row, col}) => (isVertical ? col == pos.col : row == pos.row)
    );
    if (!neighbor) break;

    prev = pos;
    pos = neighbor;
  }

  return {letters: letters.join(''), count};
}

console.log(traverse(input));
