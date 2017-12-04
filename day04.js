const input = require('./day04_input');
const assert = require('assert');

assert.equal(isValid('aa bb cc dd ee'), true);
assert.equal(isValid('aa bb cc dd aa'), false);
assert.equal(isValid('aa bb cc dd aaa'), true);

function isValid(passphrase) {
  const words = passphrase.split(' ');
  return words.length == [...new Set(words)].length;
}

console.log(input.filter(isValid).length);
