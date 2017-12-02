const input = require('./day02_input');
const assert = require('assert');

assert.equal(checksum('5 1 9 5\n7 5 3\n2 4 6 8'), 18);

function checksum(spreadsheet) {
  return spreadsheet.split('\n')
    .map((row) => row.split(' ').map(Number))
    .map((row) => Math.max(...row) - Math.min(...row))
    .reduce((a, b) => a + b, 0);
}

console.log(checksum(input));
