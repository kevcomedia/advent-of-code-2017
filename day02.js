const input = require('./day02_input');
const assert = require('assert');

assert.equal(checksumDifference('5 1 9 5\n7 5 3\n2 4 6 8'), 18);

function checksumDifference(spreadsheet) {
  return spreadsheet.split('\n')
    .map((row) => row.split(' ').map(Number))
    .map((row) => Math.max(...row) - Math.min(...row))
    .reduce((a, b) => a + b, 0);
}

assert.equal(checksumDivisible('5 9 2 8\n9 4 7 3\n3 8 6 5'), 9);

function checksumDivisible(spreadsheet) {
  return spreadsheet.split('\n')
    .map((row) => row.split(' ').map(Number))
    .map((row) => row.filter((num, idx, arr) => {
      for (let i = 0; i < arr.length; i++) {
        if (i == idx) continue;
        const min = Math.min(num, arr[i]);
        const max = Math.max(num, arr[i]);
        if (max % min == 0) {
          return true;
        }
      }
      return false;
    }))
    .map((row) => Math.max(...row) / Math.min(...row))
    .reduce((a, b) => a + b, 0);
}

console.log(checksumDivisible(input));
