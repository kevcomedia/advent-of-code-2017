const assert = require('assert');
const input = require('./day01_input');

function circularSum(offsetPredicateFn) {
  return function(sequence) {
    return [...sequence]
      .map(Number)
      .filter(offsetPredicateFn)
      .reduce((a, b) => a + b, 0);
  }
}

/*
 * String -> Natural
 * Produce the sum of the digits whose next digit is equal to itself. The next
 * digit of the last digit is the first digit.
 */
const sumNextDigit = circularSum((d, i, a) => d == a[(i + 1) % a.length]);
assert.equal(sumNextDigit('1122'), 3);
assert.equal(sumNextDigit('1111'), 4);
assert.equal(sumNextDigit('1234'), 0);
assert.equal(sumNextDigit('91212129'), 9);

/*
 * String -> Natural
 * Produce the sum of the digits that are equal to the digit halfway ahead. The
 * input is assumed to have an even number of digits.
 */
const sumHalfwayDigit = circularSum((d, i, a) => d == a[(i + a.length / 2) % a.length])
assert.equal(sumHalfwayDigit('1212'), 6);
assert.equal(sumHalfwayDigit('1221'), 0);
assert.equal(sumHalfwayDigit('123425'), 4);
assert.equal(sumHalfwayDigit('123123'), 12);
assert.equal(sumHalfwayDigit('12131415'), 4);

console.log(sumHalfwayDigit(input));
