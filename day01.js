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

/*
 * String -> Natural
 * Produce the sum of the digits that are equal to the digit halfway ahead. The
 * input is assumed to have an even number of digits.
 */
assert.equal(digitHalfwaySum('1212'), 6);
assert.equal(digitHalfwaySum('1221'), 0);
assert.equal(digitHalfwaySum('123425'), 4);
assert.equal(digitHalfwaySum('123123'), 12);
assert.equal(digitHalfwaySum('12131415'), 4);

function digitHalfwaySum(sequence) {
  return [...sequence]
    .map(Number)
    .filter((digit, i, a) => digit == a[(i + a.length / 2) % a.length])
    .reduce((a, b) => a + b, 0);
}

console.log(digitHalfwaySum(input));
