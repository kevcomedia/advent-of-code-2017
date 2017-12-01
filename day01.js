const assert = require('assert');
const input = require('./day01_input');

/*
 * String -> Natural
 * Produce the sum of the digits whose next digit is equal to itself. The next
 * digit of the last digit is the first digit.
 */
assert.equal(circularDigitSum('1122'), 3);
assert.equal(circularDigitSum('1111'), 4);
assert.equal(circularDigitSum('1234'), 0);
assert.equal(circularDigitSum('91212129'), 9);

function circularDigitSum(sequence) {
  return [...sequence]
    .map(Number)
    .filter((digit, i, a) => digit == a[(i + 1) % a.length])
    .reduce((a, b) => a + b, 0);
}

console.log(circularDigitSum(input));
