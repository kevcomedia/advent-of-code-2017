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

